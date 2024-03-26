<template>
    <the-navbar></the-navbar>
    
    <div class="container with-nav">
        <app-message/>
        <the-sidebar/>
        <router-view></router-view>
    </div>
  </template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import AppMessage from '@/components/ui/AppMessage.vue';
import TheSidebar from '@/components/TheSidebar.vue';
export default{
    components:{
        TheNavbar,
        AppMessage,
        TheSidebar
    }
}
</script>