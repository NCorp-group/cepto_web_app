<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'">
      <component :is="Component"/>
    </transition>
  </router-view>
</template>

<style>
.full-screen {
  height: 100vh;
  width: 100vw;
}
.center-content {
  display: flex;
  justify-content: center;
  align-content: center;
}
#nav {
  position: absolute;
  z-index: 100;
}
.btn {
  border: none;
  padding: 10px;
  color: white;
  font-size: 16px;
  margin: 10px 0;
  border-radius: 10px;
  background: linear-gradient(200deg, rgba(67, 178, 228, 0), rgba(67, 178, 228, 0.8) 100%),
              linear-gradient(20deg, rgba(34, 43, 98, 0), rgba(34, 43, 98, 0.7) 70%),
              linear-gradient(120deg, rgba(67, 178, 228, 0), rgba(67, 178, 228, 1)),
              linear-gradient(320deg, rgba(34, 43, 98, 0), rgba(34, 43, 98, 1));
  box-shadow: 0 3px 6px #191919;
  transition: ease-in-out 100ms;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px #191919;
}
.btn:active {
  transform: translateY(3px);
  box-shadow: 0 1px 2px #191919;
}
.btn.full-width {
  width: 100%;
}

/* FADE */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* SLIDE RIGHT FADE */
.slide-fade-right-enter-active {
  transition: all .3s ease;
  transition-delay: .3s;
}
.slide-fade-right-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-right-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-right-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-right-leave-from, .slide-fade-right-enter-to {
  opacity: 1;
}

/* SLIDE LEFT FADE */
.slide-fade-left-enter-active {
  transition: all .3s ease;
  transition-delay: .3s;
}
.slide-fade-left-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-left-enter-from {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-left-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
.slide-fade-left-leave-from, .slide-fade-left-enter-to {
  opacity: 1;
}

/* SLIDE DOWN or UP */
.slide-right-enter-active, .slide-left-enter-active, .slide-down-enter-active {
  transition: all 0.3s ease;
}
.slide-right-leave-active, .slide-left-leave-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-right-fade-enter, .slide-right-leave-to {
  transform: translateY(100vh);
}
.slide-down-fade-enter, .slide-down-leave-to {
  transform: translateY(-100vh);
}
</style>