<template>
  <v-dialog v-model="dialog" width="80%" height="900px" overflow="hidden" pa-6>
    <v-card class="pa-12">
      <v-form>
        <v-text-field v-model="search" label="Search" outlined></v-text-field>
        <!-- 
        <v-row>
          <v-list-item
            v-for="pair in filterBy(pairs, search)"
            :key="pair.symbol"
          >
            <v-list-item-content>
              <v-list-item-title
                >{{ pair.symbol }} - {{ pair.price }}</v-list-item-title
              >
            </v-list-item-content>
            <v-text-field
              outlined
              v-model="numberValue"
              hide-details
              single-line
              type="number"
              class="shrink mr-2"
              width="50px"
              height="50px"
            />
            <AddBtn />
          </v-list-item>
        </v-row> -->
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: ['dialog', 'search'],
  data: () => ({
    modalDialog: this.dialog,
    modalSearch: this.search,
  }),
  methods: {},
};
</script>

<style></style>
