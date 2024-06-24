<template>
  <div class="home-view__content flex flex-col gap-8 p-5 my-8">
    <div
      class="home-view__about-us flex flex-col lg:flex-row justify-around items-center gap-5"
    >
      <div class="home-view__about-us__text">
        <img src="@/assets/images/services-1.jpg" alt="about-us" />
      </div>
      <div
        class="home-view__about-us__text lg:w-3/4 self-center text-paragraph bg-white p-5 rounded-3xl"
      >
        <h1 class="text-title">Lavoriamo per te</h1>
        <br />
        Siamo qui per offrirti un'esperienza unica e personalizzata. I nostri
        servizi sono pensati per soddisfare ogni tua esigenza, con
        professionalità e attenzione ai dettagli. Da consulenze dedicate a
        soluzioni su misura, ci impegniamo ogni giorno per superare le tue
        aspettative. Con un team esperto e appassionato, ti accompagniamo in
        ogni fase, garantendo qualità e affidabilità. Dal primo contatto alla
        consegna finale, mettiamo al centro la tua soddisfazione. Siamo qui per
        te, per rendere ogni tua idea realtà e per costruire insieme un rapporto
        duraturo basato sulla fiducia e sulla qualità del nostro lavoro.
      </div>
    </div>
    <div
      class="home-view__cosa-facciamo flex flex-col-reverse lg:flex-row justify-around items-center gap-5"
    >
      <div
        class="home-view__about-us__text lg:w-3/4 self-center text-paragraph bg-white p-5 rounded-3xl"
      >
        <h1 class="text-title">I nostri servizi</h1>
        <br />
        Scopri come possiamo migliorare il tuo mondo con i nostri eccellenti
        servizi: un ventaglio di soluzioni pensate su misura per te:

        <Accordion :activeIndex="0">
          <AccordionTab
            v-for="tab in tabs"
            :key="tab.title"
            :header="tab.title"
          >
            <p class="m-0">{{ tab.content }}</p>
          </AccordionTab>
        </Accordion>
      </div>
      <div class="home-view__about-us__text">
        <img src="@/assets/images/services-2.jpg" alt="about-us" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { ref } from "vue";

const tabs = ref([
  {
    title: "Consulenza IT Strategica",
    content:
      "La nostra consulenza IT strategica si concentra sull'analisi dettagliata delle esigenze aziendali, progettando e implementando strategie IT mirate che migliorano l'efficienza operativa e promuovono la crescita aziendale attraverso l'adozione intelligente di tecnologie e processi digitali.",
  },
  {
    title: "Cybersecurity e Gestione dei Rischi",
    content:
      "Offriamo soluzioni avanzate di sicurezza informatica per proteggere le infrastrutture e i dati aziendali da minacce esterne, attraverso audit, monitoraggio continuo e implementazione di politiche di sicurezza rigorose, garantendo la conformità normativa e la tranquillità degli stakeholder.",
  },
  {
    title: "Gestione dei Progetti IT",
    content:
      "La nostra expertise nella gestione dei progetti IT assicura il successo delle iniziative aziendali, coordinando risorse, pianificazione delle attività e controllo dei budget per garantire il completamento tempestivo e conforme agli obiettivi strategici stabiliti.",
  },
  {
    title: "Implementazione di Sistemi ERP",
    content:
      "Personalizziamo e implementiamo sistemi ERP (Enterprise Resource Planning) per ottimizzare la gestione delle risorse aziendali, migliorando la visibilità, la coerenza dei dati e l'efficienza operativa attraverso la centralizzazione e l'integrazione dei processi aziendali.",
  },
  {
    title: "Assistenza e Supporto Tecnico",
    content:
      "Forniamo un supporto tecnico completo e proattivo, sia remoto che on-site, per risolvere tempestivamente le problematiche informatiche, garantendo il corretto funzionamento delle infrastrutture IT e il supporto continuo agli utenti per massimizzare l'utilizzo delle tecnologie aziendali.",
  },
]);
</script>

<style lang="scss">
.p-accordion .p-accordion-tab .p-accordion-header .p-accordion-header-link {
  justify-content: space-between;
  padding: 0.5rem 0 0.5rem 0;

  svg {
    order: 1;
  }
  span {
    order: 0;
  }
}

.p-accordion .p-accordion-content {
  padding: 0.5rem 0 0.5rem 0 !important;
}
.p-accordion
  .p-accordion-header:not(.p-disabled)
  .p-accordion-header-link:focus {
  box-shadow: none !important;
}
</style>
