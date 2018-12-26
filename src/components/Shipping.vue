<template>
    <form>
        <form-element name="email" type="text" required></form-element>
    </form>
</template>

<script>
import FormElement from './utilities/FormElement.vue'

export default {
  components: { FormElement }
}
</script>
