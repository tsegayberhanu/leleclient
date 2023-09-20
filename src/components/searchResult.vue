<template>

    <div>
        <app-header></app-header>
        <v-card>
           <div> you searcing for <span> </span>  {{query}}</div>
           <div>
               {{result}}
           </div>
        </v-card>
        <app-footer></app-footer>
        
    </div>
</template>
<script>
export default {
    props:["query"],
    computed:{
        result(){
            return this.$route.params.result
        }
    }
    
}
</script>