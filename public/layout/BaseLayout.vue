<template>
    <div
        class="bg-gray-200 dark:bg-zinc-900"
        v-cloak
    >
        <nav class="navbar bg-neutral-800 h-16 top-0 w-full fixed flex z-40 shadow-lg">
            <div
                class="w-full mx-auto flex items-center"
                style="background-color: transparent !important;"
            >
                <button
                    id="menu-toggle"
                    name="Navbar Button"
                    aria-label="Navbar Button"
                    class="text-slate-700 dark:text-slate-200 text-2xl p-2 lg:hidden ml-2"
                    @click="toggleMenu"
                >
                    <IconBars3 class="text-black w-8 h-8 dark:text-slate-50 text-2xl p-1 hover:text-neutral-300"></IconBars3>
                </button>

                <div class="w-60">
                    <a
                        href="https://cmmv.io/docs"
                        title="CMMV - Contract Model Model View Framework"
                        class="text-white ml-4 flex items-center"
                    >
                        <img src="/assets/android-chrome-192x192.png" alt="CMMV Logo" height="32" width="32">
                        <span class="ml-2 text-lg text-slate-700 dark:text-slate-200 font-semibold">CMMV</span>
                    </a>
                </div>

                <div class="justify-between w-full text mr-2 flex">
                    <div
                        class="text-black dark:text-slate-50 relative text-left items-center gap-x-8 lg:flex hidden"
                    >
                        <ul class="flex gap-x-8 items-center lg:flex">
                            <li class="relative">
                                <a
                                    href="https://cmmv.io/docs/overview/first-steps"
                                    class="text-sm/6 font-semibold flex items-center gap-1 hover:text-blue-700"
                                    title="Server"
                                >Getting Started</a>
                            </li>
                            <li class="relative">
                                <a
                                    href="https://cmmv.io/docs/server/overview"
                                    class="text-sm/6 font-semibold flex items-center gap-1 hover:text-blue-700"
                                    title="Server"
                                >Server</a>
                            </li>
                            <li class="relative">
                                <a
                                    href="https://cmmv.io/docs/contracts/overview"
                                    class="text-sm/6 font-semibold flex items-center gap-1 hover:text-blue-700"
                                    title="Contracts"
                                >Contracts</a>
                            </li>
                            <li class="relative">
                                <a
                                    href="https://cmmv.io/docs/rpc/overview"
                                    class="text-sm/6 font-semibold flex items-center gap-1 hover:text-blue-700"
                                    title="RPC"
                                >RPC</a>
                            </li>
                            <li class="relative">
                                <a
                                    href="https://cmmv.io/docs/view/overview"
                                    class="text-sm/6 font-semibold flex items-center gap-1 hover:text-blue-700"
                                    title="View"
                                >View</a>
                            </li>
                            <li class="relative">
                                <a
                                    href="https://ui.cmmv.io"
                                    class="text-sm/6 font-semibold flex items-center gap-1 hover:text-blue-700"
                                    title="UI"
                                >UI</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="relative text-right hover:cursor-pointer group float-right">
                    <div id="docsearch" class="dark"></div>
                </div>

                <div class="justify-between align-middle text-center mr-2 text-white flex">
                    <SwitchTheme />

                    <!-- GitHub Link -->
                    <a
                        href="https://github.com/cmmvio/cmmv-ui"
                        title="Github"
                        target="_blank"
                        class="mr-2"
                    >
                        <IconGithub class="text-black w-8 h-8 dark:text-slate-50 text-2xl p-1 hover:text-neutral-300 dar:hover:text-neutral-800"></IconGithub>
                    </a>
                </div>
            </div>
        </nav>

        <main class="flex flex-wrap mx-auto">
            <div
                id="sidebar-menu"
                :class="[{ show: isMenuVisible }, 'bg-gray-200 dark:bg-zinc-900 w-60 fixed z-40 overflow-auto text-slate-800 leftbar h-screen lg:block pb-10']"
            >
                <Navbar ref="navbar"></Navbar>
            </div>

            <div class="mt-16 lg:ml-64 sm:ml-4 ml-4 text-justify relative m-auto lg:max-w-[calc(100%-16rem)] max-w-[calc(100%-1rem)]" >
                <div class="pl-2 m-auto px-6 mt-4 w-full">
                    <div class="text-slate-800 relative dark:text-white mb-20 context-html">
                        <slot />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from "./Navbar.vue";
import SwitchTheme from "./SwitchTheme.vue";
import IconGithub from "@components/icons/IconGithub.vue";
import IconBars3 from "@components/icons/IconBars3.vue";

const route = useRoute();
const isMenuVisible = ref(false);
let navbarScrollWatcher = null;

const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
};

const saveNavbarScrollPosition = () => {
    // Obtem o elemento da navbar
    const navbarElement = document.getElementById('sidebar-menu');
    if (navbarElement) {
        // Salva a posição do scrollbar da navbar
        const navbarScrollPosition = {
            y: navbarElement.scrollTop
        };
        localStorage.setItem('navbar_scroll_position', JSON.stringify(navbarScrollPosition));
    }
};

const setupNavbarScrollWatcher = () => {
    // Watcher para o scroll da navbar
    const navbarElement = document.getElementById('sidebar-menu');
    if (navbarElement) {
        navbarScrollWatcher = () => {
            saveNavbarScrollPosition();
        };
        navbarElement.addEventListener('scroll', navbarScrollWatcher, { passive: true });
    }
};

const restoreNavbarScrollPosition = () => {
    // Recupera a posição armazenada para a navbar
    const savedNavbarPosition = localStorage.getItem('navbar_scroll_position');

    if (savedNavbarPosition) {
        const { y } = JSON.parse(savedNavbarPosition);
        // Restaura a posição do scroll da navbar
        nextTick(() => {
            const navbarElement = document.getElementById('sidebar-menu');
            if (navbarElement) {
                navbarElement.scrollTop = y;
            }
        });
    }
};

onMounted(() => {
    setupNavbarScrollWatcher();
    // Pequeno timeout para garantir que o conteúdo foi renderizado
    setTimeout(() => {
        restoreNavbarScrollPosition();
    }, 100);
});

onBeforeUnmount(() => {
    // Remove o event listener da navbar
    const navbarElement = document.getElementById('sidebar-menu');
    if (navbarElement && navbarScrollWatcher) {
        navbarElement.removeEventListener('scroll', navbarScrollWatcher);
    }

    // Salva a posição da navbar antes de desmontar
    saveNavbarScrollPosition();
});
</script>
