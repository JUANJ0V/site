<?php
/**
 * api.php — API REST para o DataProvider
 * 
 * Endpoints:
 *   HEAD /api.php?ping         → Teste de conexão
 *   GET  /api.php?all          → Retorna todos os dados
 *   GET  /api.php?collection   → Retorna uma coleção (properties, empreendimentos, etc.)
 *   POST /api.php               → Salva todos os dados
 * 
 * Modo de uso:
 *   1. Configure api-config.php com seus dados de MySQL
 *   2. Faça upload de api.php e api-config.php para a raiz do site
 *   3. No admin > Config, ative "Modo BD" com URL base: /api.php
 *   4. Execute /api.php?setup uma vez para criar as tabelas
 */

require_once __DIR__ . '/api-config.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, HEAD, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- Autenticação opcional ---
if (defined('API_PASSWORD') && API_PASSWORD) {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = $_GET['token'] ?? '';
    if ($auth !== 'Bearer ' . API_PASSWORD && $token !== API_PASSWORD) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'error' => 'Não autorizado']);
        exit;
    }
}

// --- Conexão PDO ---
try {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Erro de conexão: ' . $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// ===================================================================
// HEAD /api.php?ping — Teste de conexão
// ===================================================================
if ($method === 'HEAD' && $action === 'ping') {
    http_response_code(200);
    exit;
}

// ===================================================================
// GET /api.php?setup — Cria as tabelas (uma vez)
// ===================================================================
if ($method === 'GET' && $action === 'setup') {
    try {
        $pdo->exec(file_get_contents(__FILE__, false, null, strpos(__FILE__, '-- SQL SCHEMA --')));
        echo json_encode(['ok' => true, 'message' => 'Tabelas criadas com sucesso!']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// ===================================================================
// GET /api.php?all — Retorna todos os dados
// ===================================================================
if ($method === 'GET' && $action === 'all') {
    try {
        $data = [
            'constants'      => getConstants($pdo),
            'stats'          => fetchAll($pdo, 'stats', 'sort_order ASC'),
            'properties'     => getProperties($pdo),
            'empreendimentos'=> getEmpreendimentos($pdo),
            'faq'            => fetchAll($pdo, 'faq', 'sort_order ASC'),
            'depoimentos'    => fetchAll($pdo, 'depoimentos', 'sort_order ASC'),
            'parceiros'      => fetchAll($pdo, 'parceiros', 'sort_order ASC'),
            'blog'           => getBlogPosts($pdo),
        ];
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}

// ===================================================================
// GET /api.php?collection=... — Retorna uma coleção específica
// ===================================================================
if ($method === 'GET' && $action) {
    $map = [
        'properties'      => 'getProperties',
        'empreendimentos' => 'getEmpreendimentos',
        'blog'            => 'getBlogPosts',
        'stats'           => 'getStats',
    ];
    if (isset($map[$action])) {
        try {
            $data = $map[$action]($pdo);
            echo json_encode($data, JSON_UNESCAPED_UNICODE);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
        }
    } else {
        http_response_code(404);
        echo json_encode(['ok' => false, 'error' => 'Coleção inválida']);
    }
    exit;
}

// ===================================================================
// POST /api.php — Salva todos os dados
// ===================================================================
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'JSON inválido']);
        exit;
    }

    try {
        $pdo->beginTransaction();

        if (isset($input['constants'])) saveConstants($pdo, $input['constants']);
        if (isset($input['stats']))       saveStats($pdo, $input['stats']);
        if (isset($input['properties']))  saveProperties($pdo, $input['properties']);
        if (isset($input['empreendimentos'])) saveEmpreendimentos($pdo, $input['empreendimentos']);
        if (isset($input['faq']))         saveFaq($pdo, $input['faq']);
        if (isset($input['depoimentos'])) saveDepoimentos($pdo, $input['depoimentos']);
        if (isset($input['parceiros']))   saveParceiros($pdo, $input['parceiros']);
        if (isset($input['blog']))        saveBlogPosts($pdo, $input['blog']);

        $pdo->commit();
        echo json_encode(['ok' => true, 'message' => 'Dados salvos com sucesso!']);
    } catch (Exception $e) {
        $pdo->rollBack();
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// Se chegou aqui, rota inválida
http_response_code(404);
echo json_encode(['ok' => false, 'error' => 'Endpoint inválido']);

// ===================================================================
// FUNÇÕES AUXILIARES
// ===================================================================

function fetchAll($pdo, $table, $order = 'id ASC') {
    $stmt = $pdo->query("SELECT * FROM `{$table}` ORDER BY {$order}");
    return $stmt->fetchAll();
}

function getConstants($pdo) {
    $stmt = $pdo->query("SELECT data FROM config WHERE id = 1");
    $row = $stmt->fetch();
    return $row ? json_decode($row['data'], true) : [];
}

function getProperties($pdo) {
    $rows = fetchAll($pdo, 'properties', 'FIELD(type, "sale","rent"), title ASC');
    return array_map(function($r) {
        $r['gallery']  = json_decode($r['gallery'] ?? '[]', true);
        $r['features'] = json_decode($r['features'] ?? '[]', true);
        $r['priceNum'] = (float)($r['priceNum'] ?? 0);
        $r['beds']     = (int)($r['beds'] ?? 0);
        $r['baths']    = (int)($r['baths'] ?? 0);
        $r['garage']   = (int)($r['garage'] ?? 0);
        $r['area']     = (int)($r['area'] ?? 0);
        $r['lat']      = $r['lat'] ? (float)$r['lat'] : null;
        $r['lng']      = $r['lng'] ? (float)$r['lng'] : null;
        $r['front']    = $r['front'] ? (float)$r['front'] : null;
        $r['back']     = $r['back'] ? (float)$r['back'] : null;
        unset($r['id_db'], $r['created_at'], $r['updated_at'], $r['sort_order']);
        return $r;
    }, $rows);
}

function getEmpreendimentos($pdo) {
    $rows = fetchAll($pdo, 'empreendimentos', 'title ASC');
    return array_map(function($r) {
        foreach (['gallery','tags','plants','timeline','amenities','prices','payment'] as $jf) {
            $r[$jf] = json_decode($r[$jf] ?? '[]', true);
        }
        $r['priceNum'] = (float)($r['priceNum'] ?? 0);
        $r['progress'] = (int)($r['progress'] ?? 0);
        $r['lat']      = $r['lat'] ? (float)$r['lat'] : null;
        $r['lng']      = $r['lng'] ? (float)$r['lng'] : null;
        unset($r['id_db'], $r['created_at'], $r['updated_at'], $r['sort_order']);
        return $r;
    }, $rows);
}

function getStats($pdo) {
    return fetchAll($pdo, 'stats', 'sort_order ASC');
}

function getBlogPosts($pdo) {
    $rows = fetchAll($pdo, 'blog_posts', 'date DESC');
    return array_map(function($r) {
        unset($r['id_db'], $r['created_at'], $r['updated_at'], $r['sort_order']);
        return $r;
    }, $rows);
}

// ─── SAVE ────────────────────────────────────────────────────────

function saveConstants($pdo, $data) {
    $stmt = $pdo->prepare("INSERT INTO config (id, data) VALUES (1, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)");
    $stmt->execute([json_encode($data, JSON_UNESCAPED_UNICODE)]);
}

function saveStats($pdo, $items) {
    $pdo->exec("TRUNCATE TABLE stats");
    if (empty($items)) return;
    $stmt = $pdo->prepare("INSERT INTO stats (label, value, icon, sort_order) VALUES (?, ?, ?, ?)");
    foreach ($items as $i => $s) {
        $stmt->execute([$s['label'] ?? '', $s['value'] ?? '', $s['icon'] ?? '', $i]);
    }
}

function saveProperties($pdo, $items) {
    $pdo->exec("DELETE FROM properties");
    if (empty($items)) return;
    $stmt = $pdo->prepare("INSERT INTO properties
        (id, type, category, title, price, priceNum, location, maps, lat, lng, status,
         `desc`, beds, baths, garage, area, img, gallery, video, features, description,
         front, back, zone, topography)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    foreach ($items as $p) {
        $stmt->execute([
            $p['id'] ?? uniqid('prop-'),
            $p['type'] ?? 'sale',
            $p['category'] ?? 'Apartamento',
            $p['title'] ?? '',
            $p['price'] ?? '',
            $p['priceNum'] ?? 0,
            $p['location'] ?? '',
            $p['maps'] ?? '',
            $p['lat'] ?? null,
            $p['lng'] ?? null,
            $p['status'] ?? 'disponivel',
            $p['desc'] ?? '',
            $p['beds'] ?? 0,
            $p['baths'] ?? 0,
            $p['garage'] ?? 0,
            $p['area'] ?? 0,
            $p['img'] ?? '',
            json_encode($p['gallery'] ?? [], JSON_UNESCAPED_UNICODE),
            $p['video'] ?? '',
            json_encode($p['features'] ?? [], JSON_UNESCAPED_UNICODE),
            $p['description'] ?? '',
            $p['front'] ?? null,
            $p['back'] ?? null,
            $p['zone'] ?? null,
            $p['topography'] ?? null,
        ]);
    }
}

function saveEmpreendimentos($pdo, $items) {
    $pdo->exec("DELETE FROM empreendimentos");
    if (empty($items)) return;
    $stmt = $pdo->prepare("INSERT INTO empreendimentos
        (id, title, location, price, priceNum, lat, lng, description, img,
         gallery, video, tags, progress, progressLabel, delivery,
         plants, timeline, amenities, prices, payment)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    foreach ($items as $e) {
        $stmt->execute([
            $e['id'] ?? uniqid('emp-'),
            $e['title'] ?? '',
            $e['location'] ?? '',
            $e['price'] ?? '',
            $e['priceNum'] ?? 0,
            $e['lat'] ?? null,
            $e['lng'] ?? null,
            $e['description'] ?? '',
            $e['img'] ?? '',
            json_encode($e['gallery'] ?? [], JSON_UNESCAPED_UNICODE),
            $e['video'] ?? '',
            json_encode($e['tags'] ?? [], JSON_UNESCAPED_UNICODE),
            $e['progress'] ?? 0,
            $e['progressLabel'] ?? '',
            $e['delivery'] ?? '',
            json_encode($e['plants'] ?? [], JSON_UNESCAPED_UNICODE),
            json_encode($e['timeline'] ?? [], JSON_UNESCAPED_UNICODE),
            json_encode($e['amenities'] ?? [], JSON_UNESCAPED_UNICODE),
            json_encode($e['prices'] ?? [], JSON_UNESCAPED_UNICODE),
            json_encode($e['payment'] ?? [], JSON_UNESCAPED_UNICODE),
        ]);
    }
}

function saveFaq($pdo, $items) {
    $pdo->exec("TRUNCATE TABLE faq");
    if (empty($items)) return;
    $stmt = $pdo->prepare("INSERT INTO faq (q, a, sort_order) VALUES (?, ?, ?)");
    foreach ($items as $i => $f) {
        $stmt->execute([$f['q'] ?? '', $f['a'] ?? '', $i]);
    }
}

function saveDepoimentos($pdo, $items) {
    $pdo->exec("TRUNCATE TABLE depoimentos");
    if (empty($items)) return;
    $stmt = $pdo->prepare("INSERT INTO depoimentos (name, role, text, sort_order) VALUES (?, ?, ?, ?)");
    foreach ($items as $i => $d) {
        $stmt->execute([$d['name'] ?? '', $d['role'] ?? '', $d['text'] ?? '', $i]);
    }
}

function saveParceiros($pdo, $items) {
    $pdo->exec("TRUNCATE TABLE parceiros");
    if (empty($items)) return;
    $stmt = $pdo->prepare("INSERT INTO parceiros (name, img, url, sort_order) VALUES (?, ?, ?, ?)");
    foreach ($items as $i => $p) {
        $stmt->execute([$p['name'] ?? '', $p['img'] ?? '', $p['url'] ?? '', $i]);
    }
}

function saveBlogPosts($pdo, $items) {
    $pdo->exec("DELETE FROM blog_posts");
    if (empty($items)) return;
    $stmt = $pdo->prepare("INSERT INTO blog_posts (id, title, date, category, author, image, excerpt, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    foreach ($items as $b) {
        $stmt->execute([
            $b['id'] ?? uniqid('post-'),
            $b['title'] ?? '',
            $b['date'] ?? date('d/m/Y'),
            $b['category'] ?? '',
            $b['author'] ?? '',
            $b['image'] ?? '',
            $b['excerpt'] ?? '',
            $b['content'] ?? '',
        ]);
    }
}

/* ===================================================================
   SQL SCHEMA — Copie e execute no phpMyAdmin ou use /api.php?setup
   ===================================================================

CREATE DATABASE IF NOT EXISTS `{SEU_BANCO}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `{SEU_BANCO}`;

-- Configurações
CREATE TABLE IF NOT EXISTS config (
    id INT PRIMARY KEY DEFAULT 1,
    data JSON NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO config (id, data) VALUES (1, '{}') ON DUPLICATE KEY UPDATE data = data;

-- Stats
CREATE TABLE IF NOT EXISTS stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    icon VARCHAR(255) DEFAULT '',
    sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Properties
CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(100) PRIMARY KEY,
    type ENUM('sale','rent') NOT NULL DEFAULT 'sale',
    category VARCHAR(50) NOT NULL DEFAULT 'Apartamento',
    title VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    priceNum DECIMAL(12,2) DEFAULT 0,
    location VARCHAR(255) NOT NULL,
    maps TEXT,
    lat DECIMAL(10,6) DEFAULT NULL,
    lng DECIMAL(10,6) DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'disponivel',
    `desc` TEXT,
    beds INT DEFAULT 0,
    baths INT DEFAULT 0,
    garage INT DEFAULT 0,
    area INT DEFAULT 0,
    img TEXT,
    gallery JSON,
    video TEXT,
    features JSON,
    description TEXT,
    front DECIMAL(10,2) DEFAULT NULL,
    back DECIMAL(10,2) DEFAULT NULL,
    zone VARCHAR(50) DEFAULT NULL,
    topography VARCHAR(50) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Empreendimentos
CREATE TABLE IF NOT EXISTS empreendimentos (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price VARCHAR(100) NOT NULL,
    priceNum DECIMAL(12,2) DEFAULT 0,
    lat DECIMAL(10,6) DEFAULT NULL,
    lng DECIMAL(10,6) DEFAULT NULL,
    description TEXT,
    img TEXT,
    gallery JSON,
    video TEXT,
    tags JSON,
    progress INT DEFAULT 0,
    progressLabel VARCHAR(100) DEFAULT '',
    delivery VARCHAR(100) DEFAULT '',
    plants JSON,
    timeline JSON,
    amenities JSON,
    prices JSON,
    payment JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- FAQ
CREATE TABLE IF NOT EXISTS faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    q TEXT NOT NULL,
    a TEXT NOT NULL,
    sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Depoimentos
CREATE TABLE IF NOT EXISTS depoimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT '',
    text TEXT NOT NULL,
    sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Parceiros
CREATE TABLE IF NOT EXISTS parceiros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    img TEXT,
    url TEXT,
    sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Blog
CREATE TABLE IF NOT EXISTS blog_posts (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date VARCHAR(50) NOT NULL,
    category VARCHAR(100) DEFAULT '',
    author VARCHAR(100) DEFAULT '',
    image TEXT,
    excerpt TEXT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/
