
<template>
    <div class="card">
        <Menubar :model="items">
            <template #start>
                <img alt="logo bd" src="@/assets/images/logo-bd.png" v-if="!isMobile" />
                <img alt="logo bd" src="@/assets/images/logo-bd-mobile.png" width="30" v-else/>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                    <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
                </a>
            </template>
            <template #end>
                <div class="flex items-center gap-2">
                    <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import { ref,inject } from "vue";
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar';

const router = useRouter();
const isMobile=inject('isMobile');


const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
            router.push('/');
        }
    },
    {
        label: 'Servizi',
        icon: 'pi pi-star',
      command: () => {
        router.push('/servizi');
      }
    },
    {
        label: 'Contattaci',
        icon: 'pi pi-envelope',
        command: () => {
            router.push('/contatti');
        }
        
    }
]);
</script>

<style lang="scss"></style>
