import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Droit du numérique',
  description:
    'Droit du numérique pour développeurs : RGPD & réflexes, consentement/cookies, droits des personnes, DPIA, sous-traitants, CGU/mentions & DSA, propriété intellectuelle & licences, accessibilité légale. Principes, pas conseil juridique.',
  lang: 'fr-FR',
  srcDir: '.',
  ignoreDeadLinks: true,

  // NB : PAS d'override `vue.template.compilerOptions.delimiters` (il casse le `{{ }}` du
  // thème par défaut). cf docs/curriculum/DETTE-vitepress-delimiters.md

  themeConfig: {
    nav: [
      { text: 'Modules', link: '/modules/00-introduction-au-droit-du-numerique' },
      { text: 'Labs', link: '/labs/lab-00-introduction-au-droit-du-numerique/README' },
    ],

    sidebar: {
      '/modules/': [
        {
          text: 'Fondations',
          collapsed: false,
          items: [
            { text: '00 · Introduction au droit du numérique', link: '/modules/00-introduction-au-droit-du-numerique' },
            { text: '01 · RGPD — réflexes développeur', link: '/modules/01-rgpd-reflexes-developpeur' },
            { text: '02 · Consentement, cookies & traceurs', link: '/modules/02-consentement-cookies-et-traceurs' },
            { text: '03 · Droits des personnes', link: '/modules/03-droits-des-personnes' },
          ],
        },
        {
          text: 'Traitements & tiers',
          collapsed: false,
          items: [
            { text: '04 · DPIA — analyse d\'impact', link: '/modules/04-dpia-analyse-impact' },
            { text: '05 · DPA & sous-traitants', link: '/modules/05-dpa-et-sous-traitants' },
            { text: '06 · CGU, mentions & obligations plateforme', link: '/modules/06-cgu-mentions-et-obligations-plateforme' },
          ],
        },
        {
          text: 'PI & conformité',
          collapsed: false,
          items: [
            { text: '07 · Propriété intellectuelle & licences', link: '/modules/07-propriete-intellectuelle-et-licences' },
            { text: '08 · Accessibilité légale & conformité', link: '/modules/08-accessibilite-legale-et-conformite' },
          ],
        },
      ],

      '/labs/': [
        {
          text: 'Labs — analyses & checklists de conformité',
          collapsed: false,
          items: [
            { text: 'Lab 00 · Introduction', link: '/labs/lab-00-introduction-au-droit-du-numerique/README' },
            { text: 'Lab 01 · RGPD — réflexes', link: '/labs/lab-01-rgpd-reflexes-developpeur/README' },
            { text: 'Lab 02 · Consentement & cookies', link: '/labs/lab-02-consentement-cookies-et-traceurs/README' },
            { text: 'Lab 03 · Droits des personnes', link: '/labs/lab-03-droits-des-personnes/README' },
            { text: 'Lab 04 · DPIA', link: '/labs/lab-04-dpia-analyse-impact/README' },
            { text: 'Lab 05 · DPA & sous-traitants', link: '/labs/lab-05-dpa-et-sous-traitants/README' },
            { text: 'Lab 06 · CGU, mentions & DSA', link: '/labs/lab-06-cgu-mentions-et-obligations-plateforme/README' },
            { text: 'Lab 07 · PI & licences', link: '/labs/lab-07-propriete-intellectuelle-et-licences/README' },
            { text: 'Lab 08 · Accessibilité & conformité', link: '/labs/lab-08-accessibilite-legale-et-conformite/README' },
          ],
        },
      ],
    },

    search: { provider: 'local' },
    outline: { level: [2, 3], label: 'Sur cette page' },
    docFooter: { prev: 'Page précédente', next: 'Page suivante' },
  },
})
