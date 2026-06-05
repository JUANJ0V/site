-- ================================================================
-- BD COMPLETO PARA IMOBILIÁRIA
-- Copie e cole no phpMyAdmin (SQL) do Hostinger
-- Todas as tabelas com todos os campos necessários
-- ================================================================

-- Primeiro crie o banco (se ainda não existir):
-- CREATE DATABASE IF NOT EXISTS `seu_banco` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE `seu_banco`;

-- ================================================================
-- 1. CONFIG — Configurações do site (uma única linha)
-- ================================================================
CREATE TABLE IF NOT EXISTS config (
    id INT PRIMARY KEY DEFAULT 1,
    data JSON NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO config (id, data) VALUES (1, '{}') ON DUPLICATE KEY UPDATE data = data;

-- ================================================================
-- 2. STATS — Números da seção "Quem somos"
-- ================================================================
CREATE TABLE IF NOT EXISTS stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    icon VARCHAR(255) DEFAULT '',
    sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================================
-- 3. PROPERTIES — Imóveis para venda / aluguel
-- ================================================================
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

-- ================================================================
-- 4. EMPREENDIMENTOS — Lançamentos
-- ================================================================
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

-- ================================================================
-- 5. FAQ — Perguntas frequentes
-- ================================================================
CREATE TABLE IF NOT EXISTS faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    q TEXT NOT NULL,
    a TEXT NOT NULL,
    sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================================
-- 6. DEPOIMENTOS — Depoimentos de clientes
-- ================================================================
CREATE TABLE IF NOT EXISTS depoimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT '',
    text TEXT NOT NULL,
    sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================================
-- 7. PARCEIROS — Instituições parceiras
-- ================================================================
CREATE TABLE IF NOT EXISTS parceiros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    img TEXT,
    url TEXT,
    sort_order INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================================================
-- 8. BLOG_POSTS — Posts do blog
-- ================================================================
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

-- ================================================================
-- 9. USERS — Usuários do painel admin
-- ================================================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin','editor') NOT NULL DEFAULT 'editor',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Usuário admin padrão (senha: admin123)
INSERT INTO users (username, password_hash, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON DUPLICATE KEY UPDATE username = username;
