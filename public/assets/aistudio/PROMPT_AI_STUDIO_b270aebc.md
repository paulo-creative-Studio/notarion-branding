# PROMPT PARA O AI STUDIO (cole junto com os arquivos desta pasta)

Você é um aplicador de mudanças, NÃO um criador. Siga estas regras sem exceção:

## REGRAS RÍGIDAS
1. NÃO invente nada: nenhum texto, preço, prazo, recurso, número, depoimento, dado de contato ou código além do que está escrito abaixo e nos arquivos anexados.
2. NÃO altere NENHUM arquivo que não esteja listado abaixo. Não refatore, não "melhore", não renomeie, não reorganize, não atualize dependências, não mude estilos ou layout.
3. Nos arquivos anexados, o conteúdo é FINAL. Copie EXATAMENTE, caractere por caractere, sem reescrever, resumir, corrigir ou reformatar.
4. Nas trocas de texto, mude SOMENTE a frase indicada. Se a frase exata não for encontrada, PARE e me avise. Não adivinhe outro lugar.
5. Se algo estiver ambíguo, impossível ou conflitar com o código existente, PARE e me pergunte. Não decida sozinho.
6. Não remova funcionalidades existentes. O site deve continuar com a mesma aparência, exceto pelas trocas de texto abaixo.
7. Ao terminar, liste os arquivos criados ou alterados e diga se alguma instrução NÃO foi cumprida. Não diga que cumpriu algo que não fez.

## BLOCO A. SUBSTITUIR/CRIAR ARQUIVOS (conteúdo exato nos anexos)
- CRIAR `api/_shared.ts` (anexo `api/_shared.ts`)
- CRIAR `api/chat.ts` (anexo `api/chat.ts`)
- CRIAR `vercel.json` na raiz (anexo `vercel.json`)
- SUBSTITUIR `server.ts` pelo anexo `server.ts`
- SUBSTITUIR `index.html` pelo anexo `index.html`
- CRIAR `public/og-image.jpg` (anexo `og-image.jpg`, arquivo binário; envie o arquivo, não tente recriar a imagem)

Não instale dependências novas. `@google/genai`, `express` e `dotenv` já existem em `package.json`.

## BLOCO B. TROCAS DE TEXTO (somente estas, uma por uma)
1. `src/components/ConversionCtaSection.tsx`
   Trocar `Sem compromisso de contratação prévia` por `Sem compromisso de contratação`.
2. `src/components/ConversionCtaSection.tsx`
   Na prévia do cabeçalho, trocar o trecho `<Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 5.0 no Google` por `Prévia ilustrativa`.
   Remova o `import` do ícone `Star` SOMENTE se ele não for mais usado em nenhum outro lugar deste arquivo.
3. `src/components/PackagesSection.tsx`
   Trocar `Maior abrangência` por `Recomendado`.
4. `src/data/content.ts` (ocorre 2 vezes: pacotes "Presença Digital" e "Negócio Digital")
   Trocar `Valor atual do site · pagamento único` por `Pagamento único · manutenção contratada à parte`.
   NÃO altere `priceTag`, valores em reais nem a lista de recursos.

## BLOCO C. OPCIONAL (só aplique se esta seção estiver presente no meu envio)
`src/components/Hero.tsx`, no `<h1>`:
- texto antes do destaque: trocar `Marcas memoráveis começam com uma` por `Site profissional, cardápio digital e WhatsApp para o seu`
- texto do destaque (dentro do `<span>` com gradiente): trocar `presença extraordinária.` por `negócio local.`
Mantenha todas as classes e a estrutura do `<h1>` exatamente como estão.

## DEPOIS DE APLICAR
- Confirme que o projeto compila (`npm run lint`) e que o site abre normalmente.
- Faça o commit/sincronização com o GitHub como de costume.
- Variável de ambiente: NÃO escreva nenhuma chave de API no código. A `GEMINI_API_KEY` será configurada por mim no painel do Vercel.
