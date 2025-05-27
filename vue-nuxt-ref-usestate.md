# VUE/NUXT

## 1. <a name='Spistreci'></a>Spis treści

<!-- vscode-markdown-toc -->

- 1. [Spis treści](#Spistreci)
- 2. [Opis](#Opis)
- 3. [Różnice między Vue i Nuxt](#RnicemidzyVueiNuxt)
  - 3.1. [Zarządzanie stanem](#Zarzdzaniestanem)
  - 3.2. [Zakres stanu](#Zakresstanu)
  - 3.3. [Reaktywność](#Reaktywno)
  - 3.4. [SSR i Hydration](#SSRiHydration)
- 4. [Używanie ref() w Nuxt](#UywanierefwNuxt)
  - 4.1. [Lokalny vs. Globalny stan](#Lokalnyvs.Globalnystan)
  - 4.2. [Kiedy używać ref() w Nuxt?](#KiedyuywarefwNuxt)
- 5. [Czym jest Hydration?](#CzymjestHydration)
  - 5.1. [Jak działa Hydration?](#JakdziaaHydration)
  - 5.2. [SSR i Hydration](#SSRiHydration-1)
  - 5.3. [Hydration w Nuxt:](#HydrationwNuxt:)
- 6. [Inne różnice między Vue i Nuxt](#InnernicemidzyVueiNuxt)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## 2. <a name='Opis'></a>Opis

W tym artykule omówimy różnice między Vue 3 a Nuxt 3, szczególnie w kontekście zarządzania stanem i hydratacji. Skupimy się na funkcjach `ref()` i `useState()`, które są kluczowe dla zrozumienia, jak działa Vue i Nuxt.

## 3. <a name='RnicemidzyVueiNuxt'></a>Różnice między Vue i Nuxt

Oto kluczowe różnice w kodzie `.Vue` między **Vue 3** a **Nuxt 3**, na przykładzie `ref()` kontra `useState()`:

### 3.1. <a name='Zarzdzaniestanem'></a>Zarządzanie stanem

- **Vue 3**: Używa `ref()` i `reactive()` do zarządzania stanem w komponentach.

  ```vue
  <script setup>
  import { ref } from 'vue';

  const count = ref(0);
  </script>
  ```

- **Nuxt 3**: Korzysta z `useState()` do zarządzania stanem globalnym w aplikacji.
  ```vue
  <script setup>
  const count = useState('count', () => 0);
  </script>
  ```

### 3.2. <a name='Zakresstanu'></a>Zakres stanu

- `ref()` w Vue działa **lokalnie** w komponentach.
- `useState()` w Nuxt działa **globalnie**, dzięki czemu stan jest dostępny w całej aplikacji.

### 3.3. <a name='Reaktywno'></a>Reaktywność

- `ref()` tworzy **reaktywną** wartość, którą można modyfikować bezpośrednio.
- `useState()` w Nuxt 3 jest **zachowywane między żądaniami** i może być używane do **SSR (Server-Side Rendering)**.

### 3.4. <a name='SSRiHydration'></a>SSR i Hydration

- Vue nie ma wbudowanego mechanizmu SSR, ale można go skonfigurować.
- Nuxt jest **domyślnie zoptymalizowany pod SSR**, a `useState()` pomaga w zachowaniu stanu między żądaniami.

Jeśli chcesz więcej szczegółów, sprawdź [oficjalną dokumentację Vue](https://pl.vuejs.org/about/faq.html) oraz [Nuxt](https://nuxt.com/docs/getting-started/state-management).

## 4. <a name='UywanierefwNuxt'></a>Używanie ref() w Nuxt

W Nuxt nadal możesz używać `ref()` tak samo jak w Vue, ale warto pamiętać o kilku różnicach:

### 4.1. <a name='Lokalnyvs.Globalnystan'></a>Lokalny vs. Globalny stan

- `ref()` w Nuxt działa **lokalnie** w komponentach, tak jak w Vue.
- `useState()` jest używane do **globalnego** zarządzania stanem w aplikacji Nuxt.

Przykład użycia `ref()` w Nuxt:

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>
```

To działa identycznie jak w Vue.

### 4.2. <a name='KiedyuywarefwNuxt'></a>Kiedy używać ref() w Nuxt?

- Jeśli stan jest **lokalny** dla komponentu i nie musi być zachowywany między żądaniami.
- Jeśli nie potrzebujesz **SSR** dla tego stanu.
- Jeśli chcesz używać reaktywności Vue w obrębie jednego komponentu.

Jeśli jednak chcesz, aby stan był **globalny** i dostępny w całej aplikacji, lepiej użyć `useState()`.

## 5. <a name='CzymjestHydration'></a>Czym jest Hydration?

Hydration w Nuxt 3 to proces, w którym statyczny HTML wygenerowany po stronie serwera (SSR) staje się interaktywny po stronie klienta. Oznacza to, że kod JavaScript, który pierwotnie wygenerował HTML na serwerze, musi zostać ponownie uruchomiony w przeglądarce, aby Vue mogło przejąć kontrolę nad komponentami i umożliwić ich interakcję.

### 5.1. <a name='JakdziaaHydration'></a>Jak działa Hydration?

1. **Serwer renderuje stronę** – generuje statyczny HTML.
2. **Przeglądarka pobiera HTML** – ale początkowo nie jest on interaktywny.
3. **JavaScript jest ładowany** – Vue ponownie uruchamia kod, aby "ożywić" komponenty.
4. **Interaktywność jest przywracana** – użytkownik może wchodzić w interakcję z aplikacją.

### 5.2. <a name='SSRiHydration-1'></a>SSR i Hydration

- `ref()` działa **tylko na poziomie klienta**, więc jeśli używasz go w Nuxt, nie będzie zachowywał wartości między żądaniami.
- `useState()` jest **hydrated** po stronie serwera, co oznacza, że jego wartość zostanie zachowana między żądaniami.

Przykład `useState()` w Nuxt:

```vue
<script setup>
const count = useState('count', () => 0);
</script>
```

Tutaj `count` będzie dostępny globalnie i zachowa wartość między przeładowaniami strony.

### 5.3. <a name='HydrationwNuxt:'></a>Hydration w Nuxt:

- **useHydration()** – pozwala na pełną kontrolę nad cyklem hydratacji, synchronizując dane między serwerem a klientem.
- **Lazy Hydration** – technika optymalizacji, która pozwala na opóźnione uruchamianie hydratacji dla mniej istotnych komponentów, co poprawia wydajność.
- **NuxtLazyHydrate** – moduł pozwalający na leniwe hydracjonowanie komponentów, aby zmniejszyć obciążenie JavaScript.

Jeśli chcesz zoptymalizować hydratację w Nuxt, warto rozważyć techniki takie jak **lazy hydration** i **server components**, które redukują rozmiar paczki JavaScript i poprawiają wydajność aplikacji.

## 6. <a name='InnernicemidzyVueiNuxt'></a>Inne różnice między Vue i Nuxt

Większość natywnej funkcjonalności Vue 3 jest dostępna w Nuxt 3, ponieważ Nuxt jest zbudowany na Vue. Możesz korzystać z takich funkcji jak:

- **Reaktywność** (`ref()`, `reactive()`, `computed()`, `watch()`)
- **Komponenty** (`defineComponent()`, `defineProps()`, `defineEmits()`)
- **Dyrektywy** (`v-if`, `v-for`, `v-bind`, `v-model`, `v-slot`)
- **Kompozycja API** (`setup()`, `provide/inject`)
- **Zarządzanie zdarzeniami** (`onMounted()`, `onUpdated()`, `onUnmounted()`)

Jednak Nuxt dodaje **dodatkowe funkcjonalności**, takie jak:

- **useState()** do zarządzania globalnym stanem
- **useFetch()** do pobierania danych z API
- **useAsyncData()** do obsługi SSR i asynchronicznych danych
- **useRouter()** i **useRoute()** do obsługi routingu
