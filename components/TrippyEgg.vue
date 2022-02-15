<template>
    <div class="background">
        <div class="egg-container">
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
            <div class="slice"/>
        </div>
    </div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html {background-color: black}

.background {
    opacity: 0.25;
    width: 100%;
    height: 100%;
    position: fixed;
}

.egg-container {
    position: relative;
    left: calc(50% - 30vh);
    top: calc(50% - 30vh);
}


.slice {
  position: absolute;
  height: 60vh;
  width: 60vh;

 // border-radius: 40% 60% 10% 90% / 40% 90% 10% 60%;
 // egg
//  border-radius: 21% 69% 28% 72% / 68% 51% 49% 47%;
//  border-radius: 41% 59% 44% 51% / 21% 36% 64% 79% 
}
@import "~/styles/variables.scss";

@for $i from 1 through 20 {
  .slice:nth-child(#{$i}) {
    clip-path: circle(5% * $i at (20% + (3.5% * $i)) (2.5% * $i));
    z-index: 20-$i;
    $duration: random(100 * $i) + 250;
   // $duration: 1000;
    animation: (changingColour 
                #{$duration}ms 
                ease-in-out 
                alternate-reverse 
                infinite),
              (changeShape 
              10s 
              ease-in-out 
              alternate-reverse 
              infinite);
    //background-color: rgb(random(155)+50, random(155)+50, random(155)+50);
    background-color: nth($cool-colours, random(length($cool-colours)));
    // animation: randomColour 1s ease-in-out alternate-reverse infinite;
  }
}

@keyframes changeShape {
  0% {
    border-radius: 21% 69% 28% 72% / 68% 51% 49% 47%;
  }
  50% {
    border-radius: 40% 60% 10% 90% / 40% 90% 10% 60%;
  }
  100% {
    border-radius: 41% 59% 44% 51% / 21% 36% 64% 79% 
  }
}

@keyframes changingColour {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

</style>
