<template>
    <BaseLayout>
        <h1>Slider</h1>

        <p>
            The <code>CSlider (alias: c-slider)</code> component in the <code>@cmmv/ui</code> framework provides a customizable and versatile slider element. It supports dynamic value binding using <code>v-model</code>, validation, ticks, and customization options for colors, step size, and thumb visibility. The <code>c-slider</code> is ideal for forms, range selectors, and other interactive UI components.
        </p>

        <table-docs>
            <thead>
                <tr>
                    <th class="border-b px-4 py-2 font-semibold text-gray-800 dark:text-white">Prop</th>
                    <th class="border-b px-4 py-2 font-semibold text-gray-800 dark:text-white">Type</th>
                    <th class="border-b px-4 py-2 font-semibold text-gray-800 dark:text-white">Default</th>
                    <th class="border-b px-4 py-2 font-semibold text-gray-800 dark:text-white">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border-b px-4 py-2">modelValue</td>
                    <td class="border-b px-4 py-2">Number</td>
                    <td class="border-b px-4 py-2">0</td>
                    <td class="border-b px-4 py-2">The value bound to the slider using <code>v-model</code>.</td>
                </tr>
                <tr>
                    <td class="border-b px-4 py-2">min</td>
                    <td class="border-b px-4 py-2">Number</td>
                    <td class="border-b px-4 py-2">0</td>
                    <td class="border-b px-4 py-2">The minimum value of the slider.</td>
                </tr>
                <tr>
                    <td class="border-b px-4 py-2">max</td>
                    <td class="border-b px-4 py-2">Number</td>
                    <td class="border-b px-4 py-2">100</td>
                    <td class="border-b px-4 py-2">The maximum value of the slider.</td>
                </tr>
                <tr>
                    <td class="border-b px-4 py-2">step</td>
                    <td class="border-b px-4 py-2">Number</td>
                    <td class="border-b px-4 py-2">1</td>
                    <td class="border-b px-4 py-2">The increment step for the slider value.</td>
                </tr>
                <tr>
                    <td class="border-b px-4 py-2">showTicks</td>
                    <td class="border-b px-4 py-2">Boolean</td>
                    <td class="border-b px-4 py-2">false</td>
                    <td class="border-b px-4 py-2">Displays tick marks on the slider for each step.</td>
                </tr>
                <tr>
                    <td class="border-b px-4 py-2">tickSize</td>
                    <td class="border-b px-4 py-2">Number</td>
                    <td class="border-b px-4 py-2">10</td>
                    <td class="border-b px-4 py-2">Specifies the height of tick marks.</td>
                </tr>
                <tr>
                    <td class="border-b px-4 py-2">ticks</td>
                    <td class="border-b px-4 py-2">Array</td>
                    <td class="border-b px-4 py-2">[]</td>
                    <td class="border-b px-4 py-2">Defines custom tick mark positions.</td>
                </tr>
                <tr>
                    <td class="border-b px-4 py-2">thumb</td>
                    <td class="border-b px-4 py-2">Boolean</td>
                    <td class="border-b px-4 py-2">true</td>
                    <td class="border-b px-4 py-2">Displays the value bubble above the thumb.</td>
                </tr>
                <tr>
                    <td class="border-b px-4 py-2">disabled</td>
                    <td class="border-b px-4 py-2">Boolean</td>
                    <td class="border-b px-4 py-2">false</td>
                    <td class="border-b px-4 py-2">Disables the slider, making it non-interactive.</td>
                </tr>
                <tr>
                    <td class="border-b px-4 py-2">bgColor</td>
                    <td class="border-b px-4 py-2">String</td>
                    <td class="border-b px-4 py-2">"bg-blue-600"</td>
                    <td class="border-b px-4 py-2">Specifies the background color of the active track and thumb.</td>
                </tr>
            </tbody>
        </table-docs>

        <!-- Basic Example -->
        <h3>Basic Slider</h3>

        <p>The following example demonstrates a basic slider with two-way binding using <code>v-model</code>.</p>

        <card-docs>
            <div class="px-4 py-5 sm:p-6">
                <c-slider v-model="sliderValue" class="mt-10" thumb />
                <div class="m-auto text-center pt-4">Current Value: {{ sliderValue }}</div>
            </div>

            <template #code>
<pre><code class="code-highlight language-vue">&lt;template&gt;
    &lt;c-slider v-model="sliderValue" thumb /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from "vue";

const sliderValue = ref(5);
&lt;/script&gt;</code></pre>
            </template>
        </card-docs>

        <!-- Validation -->
        <h3>Validation</h3>

        <p>
            The <code>CSlider</code> component supports validation using the <code>rules</code> prop. These rules allow you to define custom logic for validating the slider value.
        </p>

        <card-docs>
            <div class="px-4 py-5 sm:p-6">
                <c-slider
                    v-model="validatedValue"
                    :rules="[value => value >= 50 ? null : 'Value must be at least 50.']"
                />
            </div>

            <template #code>
<pre><code class="code-highlight language-vue">&lt;template&gt;
    &lt;c-slider
        v-model="validatedValue"
        :rules="[value => value >= 50 ? null : 'Value must be at least 50.']"
    /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from "vue";

const validatedValue = ref(40);
&lt;/script&gt;</code></pre>
            </template>
        </card-docs>

        <!-- Tick Marks -->
        <h3>Step</h3>

        <p>The slider can step or custom positions defined by the <code>step</code> prop.</p>

        <card-docs>
            <div class="px-4 py-5 sm:p-6">
                <c-slider v-model="sliderTicks" step="10" />
            </div>

            <template #code>
<pre><code class="code-highlight language-vue">&lt;template&gt;
    &lt;c-slider
        v-model="sliderTicks"
        step="10"
    /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from "vue";

const sliderTicks = ref(40);
&lt;/script&gt;</code></pre>
            </template>
        </card-docs>

        <!-- Color Variations -->
        <h3>Custom Colors</h3>

        <p>
            Customize the slider's appearance by using the <code>bgColor</code>, <code>activeTrackColor</code>, and <code>thumbColor</code> props to align with your design requirements.
        </p>

        <card-docs>
            <div class="px-4 py-5 sm:p-6">
                <c-slider
                    v-model="customColorValue"
                    bgColor="bg-yellow-300"
                    thumbColor="bg-yellow-500"
                    activeTrackColor="bg-yellow-700"
                />
                <div class="m-auto text-center pt-4">Current Value: {{ customColorValue }}</div>
            </div>

            <template #code>
<pre><code class="code-highlight language-vue">&lt;template&gt;
    &lt;c-slider
        v-model="customColorValue"
        bgColor="bg-yellow-300"
        thumbColor="bg-yellow-500"
        activeTrackColor="bg-yellow-700"
    /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from "vue";

const customColorValue = ref(30);
&lt;/script&gt;</code></pre>
            </template>
        </card-docs>

        <PagePagination
            previous="Radio"
            previousLink="/radio"
            next="Textarea"
            nextLink="/textarea"
        />
    </BaseLayout>
</template>

<style scoped>
.code-highlight {
    white-space: pre;
}
</style>

<script setup>
import { ref } from "vue";
import BaseLayout from "../../layout/BaseLayout.vue";
import CardDocs from "../../components/CardDocs.vue";
import TableDocs from "../../components/TableDocs.vue";
import PagePagination from "../../layout/PagePagination.vue";

const sliderValue = ref(5);
const validatedValue = ref(40);
const sliderTicks = ref(40);
const customColorValue = ref(30);
const iconValue = ref(50);
const appendValue = ref(20);
</script>
