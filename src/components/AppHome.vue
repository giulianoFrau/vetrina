<template>
  <div class="home-view__content flex flex-col gap-20 p-5">
    <div
      class="home-view__about-us flex flex-col lg:flex-row justify-around items-center gap-5"
    >
      <div class="home-view__about-us__text">
        <img src="@/assets/images/cosa-facciamo.jpg" alt="about-us" />
      </div>
      <div
        class="home-view__about-us__text lg:w-3/4 self-center text-paragraph bg-white p-5 rounded-3xl"
      >
        <h1 class="text-title">Chi siamo</h1>
        <br />
        Siamo una giovane e dinamica azienda informatica, fondata nel luglio
        2024, con una missione chiara: rivoluzionare il mondo digitale
        attraverso innovazione e competenza. Anche se di recente costituzione,
        il nostro team è composto da professionisti esperti, con anni di
        esperienza e una profonda conoscenza del settore tecnologico. Guardiamo
        al futuro con l’obiettivo di anticipare le tendenze del mercato e di
        essere sempre un passo avanti. Investiamo costantemente nella formazione
        e nell’aggiornamento delle nostre competenze, per garantire soluzioni
        innovative e sicure. La nostra promessa è di essere un partner
        affidabile e proattivo, capace di trasformare le sfide in opportunità.
      </div>
    </div>
    <div
      class="home-view__cosa-facciamo flex flex-col-reverse lg:flex-row justify-around items-center gap-5"
    >
      <div
        class="home-view__about-us__text lg:w-3/4 self-center text-paragraph bg-white p-5 rounded-3xl"
      >
        <h1 class="text-title">Cosa facciamo</h1>
        <br />
        La nostra missione è trasformare le idee dei nostri clienti in realtà
        digitali innovative e di successo. Nel mondo digitale di oggi, una forte
        presenza online è fondamentale. I nostri servizi di digital marketing
        coprono un ampio spettro di strategie, tra cui SEO, SEM, social media
        management, content marketing e campagne pubblicitarie. Lavoriamo con te
        per creare strategie di marketing che attraggano, coinvolgano e
        fidelizzino i tuoi clienti. Progettiamo e sviluppiamo applicazioni
        software innovative che rispondono alle esigenze uniche della tua
        azienda. Dal concept iniziale alla fase di lancio, garantiamo che ogni
        progetto sia eseguito con la massima precisione e qualità.
      </div>
      <div class="home-view__about-us__text">
        <img src="@/assets/images/about-us.jpg" alt="about-us" />
      </div>
    </div>
    <div
      class="home-view__tecnologie flex flex-col lg:flex-row justify-around items-center gap-5"
    >
      <div class="home-view__about-us__text">
        <img src="@/assets/images/tecnologie.jpg" alt="about-us" />
      </div>
      <div
        class="home-view__about-us__text lg:w-3/4 self-center text-paragraph bg-white p-5 rounded-3xl"
      >
        <h1 class="text-title">Tecnologie usate</h1>
        <br />
        Nelle aziende moderne, l'adozione delle tecnologie digitali è essenziale
        per migliorare l'efficienza, la produttività e la competitività. Tra le
        tecnologie più comuni troviamo i sistemi di gestione dei dati (DBMS), le
        piattaforme di cloud computing, i software di gestione dei progetti, le
        reti di telecomunicazioni avanzate, e gli strumenti di cybersecurity.
        Queste tecnologie permettono alle aziende di ottimizzare i processi
        operativi, analizzare grandi quantità di dati per prendere decisioni
        informate, e garantire la sicurezza delle informazioni aziendali.Le
        nostre principali tecnologie sono:
        <div class="flex flex-wrap gap-3 mt-3">
          <div v-for="technology in technologies" :key="technology">
            <span
              class="px-2 py-1 border-1 border-black rounded-3xl text-title border-paragraph font-bold"
              >{{ technology }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const technologies = [
  "Javascript",
  "Vue",
  "PHP",
  "HTML5",
  "SASS",
  "CSS",
  "Wordpress",
  "Typescript",
  "SWL",
  "Restfull",
  "PWA",
  "Bootstrap",
  "PrimeVue",
  "PrimeFlex",
  "Tailwind",
];
</script>

<style lang="scss" scoped></style>
