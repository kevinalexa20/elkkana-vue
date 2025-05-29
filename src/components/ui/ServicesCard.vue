<template>
  <div id="services" class="mx-auto py-8 px-6">
    <h1 class="font-bold text-4xl mb-8">Our Services</h1>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Service Card 1 -->
      <div
        class="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
      >
        <div class="aspect-[4/3] relative">
          <img
            src="@/assets/images/service1.png"
            alt="Ship Management"
            class="w-full h-full object-cover"
          />
          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          ></div>
          <!-- Hover overlay -->
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"
          ></div>

          <!-- Content -->
          <div
            class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            <h3 class="text-lg font-bold mb-2">Ship Management</h3>
            <p
              class="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
            >
              Complete vessel management solutions for maritime operations
            </p>
          </div>
        </div>
      </div>

      <!-- Service Card 2 -->
      <div
        class="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
      >
        <div class="aspect-[4/3] relative">
          <img
            src="@/assets/images/service2.png"
            alt="Crew Management"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          ></div>
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"
          ></div>

          <div
            class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            <h3 class="text-lg font-bold mb-2">Crew Management</h3>
            <p
              class="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
            >
              Professional crew recruitment and management services
            </p>
          </div>
        </div>
      </div>

      <!-- Service Card 3 -->
      <div
        class="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
      >
        <div class="aspect-[4/3] relative">
          <img
            src="@/assets/images/service3.png"
            alt="Technical Management"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          ></div>
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"
          ></div>

          <div
            class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            <h3 class="text-lg font-bold mb-2">Technical Management</h3>
            <p
              class="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
            >
              Advanced technical solutions and maintenance services
            </p>
          </div>
        </div>
      </div>

      <!-- Service Card 4 -->
      <div
        class="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
      >
        <div class="aspect-[4/3] relative">
          <img
            src="@/assets/images/service4.png"
            alt="Education & Training"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          ></div>
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"
          ></div>

          <div
            class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
          >
            <h3 class="text-lg font-bold mb-2">Education & Training</h3>
            <p
              class="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
            >
              Comprehensive training programs for maritime professionals
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
