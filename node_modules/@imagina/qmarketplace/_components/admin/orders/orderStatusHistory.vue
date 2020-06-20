<template>
  <div id="orderStatusHistoryComponent">
    <q-table 
      :data="items"
      :columns="columns"
      :pagination="{
        rowsPerPage: 0
      }" hide-bottom
      class="no-shadow">
    </q-table>
  </div>
</template>
<script>
  export default {
    props: ['items'],
    components: {},
    watch: {},
    mounted () {
      this.$nextTick(function () {
      })
    },
    data () {
      return {
        columns: [
          { name: 'title', label: 'Estado', field: row => row.status.title, align: 'left' },
          { name: 'comment', label: 'Comentario', field: row => row.comment || '-', align: 'left' },
          {
            name: 'created_at',
            label: 'Fecha',
            field: 'created_at',
            format: val => val ? this.$d(this.$moment(val,"YYYY-MM-DD HH:mm").toDate(),'long',this.$i18n.locale) : "-",
            align: 'left'
          },
        ]
      }
    },
    methods: {}
  }
</script>
<style lang="stylus">
  #orderStatusHistoryComponent
    table
      thead
        th
          background-color $light
</style>
