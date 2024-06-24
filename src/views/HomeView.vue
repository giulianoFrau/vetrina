<template>
  <div class="home-view w-full flex flex-col">
    <app-menu />

    <div class="home-view__content flex flex-col gap-20 p-5">
      <div
        class="home-view__about-us flex flex-col md:flex-row justify-around gap-5"
      >
        <div class="home-view__about-us__text">
          <img src="@/assets/images/cosa-facciamo.jpg" alt="about-us" />
        </div>
        <div
          class="home-view__about-us__text md:w-3/4 self-center text-paragraph"
        >
          <h1 class="text-title">Chi siamo</h1>
          <br />
          Siamo una giovane e dinamica azienda informatica, fondata nel luglio
          2024, con una missione chiara: rivoluzionare il mondo digitale
          attraverso innovazione e competenza. Anche se di recente costituzione,
          il nostro team è composto da professionisti esperti, con anni di
          esperienza e una profonda conoscenza del settore tecnologico. . Dallo
          sviluppo di software alla gestione di infrastrutture IT, siamo pronti
          a supportare i nostri clienti in ogni fase del loro percorso digitale.
          La nostra visione non si limita al presente. Guardiamo al futuro con
          l’obiettivo di anticipare le tendenze del mercato e di essere sempre
          un passo avanti. Investiamo costantemente nella formazione e
          nell’aggiornamento delle nostre competenze, per garantire soluzioni
          innovative e sicure.In un mondo in continua evoluzione, la nostra
          promessa è quella di essere un partner affidabile e proattivo, capace
          di trasformare le sfide in opportunità. Collaboriamo strettamente con
          i nostri clienti, costruendo rapporti di fiducia e offrendo un
          supporto continuo, affinché possano raggiungere i loro obiettivi con
          successo. Unitevi a noi in questo entusiasmante viaggio tecnologico:
          insieme, possiamo trasformare idee innovative in realtà di successo.
          Siamo pronti a fare la differenza.
        </div>
      </div>
      <div
        class="home-view__cosa-facciamo flex flex-col-reverse md:flex-row justify-around gap-5"
      >
        <div
          class="home-view__about-us__text md:w-3/4 self-center text-paragraph"
        >
          <h1 class="text-title">Cosa facciamo</h1>
          <br />
          Siamo una giovane e dinamica azienda informatica, fondata nel luglio
          2024, con una missione chiara: rivoluzionare il mondo digitale
          attraverso innovazione e competenza. Anche se di recente costituzione,
          il nostro team è composto da professionisti esperti, con anni di
          esperienza e una profonda conoscenza del settore tecnologico. . Dallo
          sviluppo di software alla gestione di infrastrutture IT, siamo pronti
          a supportare i nostri clienti in ogni fase del loro percorso digitale.
          La nostra visione non si limita al presente. Guardiamo al futuro con
          l’obiettivo di anticipare le tendenze del mercato e di essere sempre
          un passo avanti. Investiamo costantemente nella formazione e
          nell’aggiornamento delle nostre competenze, per garantire soluzioni
          innovative e sicure.In un mondo in continua evoluzione, la nostra
          promessa è quella di essere un partner affidabile e proattivo, capace
          di trasformare le sfide in opportunità. Collaboriamo strettamente con
          i nostri clienti, costruendo rapporti di fiducia e offrendo un
          supporto continuo, affinché possano raggiungere i loro obiettivi con
          successo. Unitevi a noi in questo entusiasmante viaggio tecnologico:
          insieme, possiamo trasformare idee innovative in realtà di successo.
          Siamo pronti a fare la differenza.
        </div>
        <div class="home-view__about-us__text">
          <img src="@/assets/images/about-us.jpg" alt="about-us" />
        </div>
      </div>
      <div
        class="home-view__tecnologie flex flex-col md:flex-row justify-around gap-5"
      >
        <div class="home-view__about-us__text">
          <img src="@/assets/images/tecnologie.jpg" alt="about-us" />
        </div>
        <div
          class="home-view__about-us__text md:w-3/4 self-center text-paragraph"
        >
          <h1 class="text-title">Tecnologie usate</h1>
          <br />
          Siamo una giovane e dinamica azienda informatica, fondata nel luglio
          2024, con una missione chiara: rivoluzionare il mondo digitale
          attraverso innovazione e competenza. Anche se di recente costituzione,
          il nostro team è composto da professionisti esperti, con anni di
          esperienza e una profonda conoscenza del settore tecnologico. . Dallo
          sviluppo di software alla gestione di infrastrutture IT, siamo pronti
          a supportare i nostri clienti in ogni fase del loro percorso digitale.
          La nostra visione non si limita al presente. Guardiamo al futuro con
          l’obiettivo di anticipare le tendenze del mercato e di essere sempre
          un passo avanti. Investiamo costantemente nella formazione e
          nell’aggiornamento delle nostre competenze, per garantire soluzioni
          innovative e sicure.In un mondo in continua evoluzione, la nostra
          promessa è quella di essere un partner affidabile e proattivo, capace
          di trasformare le sfide in opportunità. Collaboriamo strettamente con
          i nostri clienti, costruendo rapporti di fiducia e offrendo un
          supporto continuo, affinché possano raggiungere i loro obiettivi con
          successo. Unitevi a noi in questo entusiasmante viaggio tecnologico:
          insieme, possiamo trasformare idee innovative in realtà di successo.
          Siamo pronti a fare la differenza.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppMenu from "../components/AppMenu.vue";
</script>

<style lang="scss" scoped></style>
