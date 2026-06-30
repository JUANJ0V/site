  <!-- FAQ -->
  <section id="faq">
    <div class="container reveal">
      <div class="section-header">
        <p class="eyebrow">FAQ</p>
        <div class="gold-rule"></div>
        <h2>Perguntas frequentes</h2>
      </div>
      <div class="faq-section" id="faq-list"></div>
      <div class="faq-cta">
        <p>Ainda tem dúvidas? </p>
          <p><a href="/contato/" class="nav-whatsapp-cta" data-whatsapp-msg="Olá, tenho uma dúvida sobre imóveis. Poderiam me ajudar?">Fale com a nossa equipe →</a></p>
      </div>
    </div>
  </section>

  <!-- FINANCIAMENTO -->
  <section id="financiamento">
    <div class="container reveal">
      <div class="section-header">
        <p class="eyebrow">Financiamento</p>
        <div class="gold-rule"></div>
        <h2>Simule seu financiamento imobiliário</h2>
      </div>
      <div class="fin-simulator" id="finSimulator">
        <div class="fin-form">
          <div style="display:grid;gap:1rem;">
            <div style="display:grid;gap:0.5rem;">
              <label style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--text);">Valor do imóvel (R$)</label>
              <input type="number" id="fin-price" value="500000" min="50000" step="10000" style="padding:0.75rem 1rem;border:1px solid var(--border);background:var(--cream);font-family:var(--font-sans);font-size:0.9rem;color:var(--text);outline:none;" />
            </div>
            <div style="display:grid;gap:0.5rem;">
              <label style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--text);">Entrada (R$)</label>
              <input type="number" id="fin-down" value="100000" min="0" step="5000" style="padding:0.75rem 1rem;border:1px solid var(--border);background:var(--cream);font-family:var(--font-sans);font-size:0.9rem;color:var(--text);outline:none;" />
            </div>
            <div style="display:grid;gap:0.5rem;">
              <label style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--text);">Taxa de juros (% a.a.)</label>
              <input type="number" id="fin-rate" value="8.5" min="1" max="20" step="0.1" style="padding:0.75rem 1rem;border:1px solid var(--border);background:var(--cream);font-family:var(--font-sans);font-size:0.9rem;color:var(--text);outline:none;" />
            </div>
            <div style="display:grid;gap:0.5rem;">
              <label style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--text);">Prazo (meses)</label>
              <select id="fin-term" style="padding:0.75rem 1rem;border:1px solid var(--border);background:var(--cream);font-family:var(--font-sans);font-size:0.9rem;color:var(--text);outline:none;">
                <option value="180">15 anos (180 meses)</option>
                <option value="240" selected>20 anos (240 meses)</option>
                <option value="300">25 anos (300 meses)</option>
                <option value="360">30 anos (360 meses)</option>
              </select>
            </div>
            <button onclick="calcFinancing()" class="btn-primary" style="justify-self:start;">Calcular</button>
          </div>
        </div>
        <div class="fin-result" id="finResult" style="display:none;">
          <div class="fin-result-grid">
            <div><p class="fin-label">Valor financiado</p><p class="fin-value" id="fin-financed">R$ 400.000</p></div>
            <div><p class="fin-label">Prestação mensal</p><p class="fin-value fin-highlight" id="fin-monthly">R$ 3.471</p></div>
            <div><p class="fin-label">Total do financiamento</p><p class="fin-value" id="fin-total">R$ 833.040</p></div>
            <div><p class="fin-label">Total de juros</p><p class="fin-value" id="fin-interest">R$ 433.040</p></div>
          </div>
          <p class="fin-obs" style="font-size:0.75rem;color:var(--muted-foreground);margin-top:0.75rem;">* Simulação com taxa fixa de juros. Valores aproximados sujeitos a aprovação de crédito.</p>
        </div>
      </div>
    </div>
  </section>
