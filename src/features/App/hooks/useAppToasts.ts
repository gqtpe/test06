import {useAppStore} from "@/features/App/appStore.ts";
import {useToast} from "vue-toast-notification";
import {watch} from "vue";

const useAppToasts = () => {
    const appStore = useAppStore()
    const toast = useToast()

    watch(() => appStore.status, (status) => {
        if (status) {
            toast.info(status, {type: 'info', duration: 4000, pauseOnHover: true, position: 'top'})
            appStore.setAppStatus(null)
        }
    })
    watch(() => appStore.error, (error) => {
        if (error) {
            toast.error(error, {type: 'error', duration: 6000, pauseOnHover: true, position: 'top'})
            appStore.setAppError(null)
        }
    })
}
export default useAppToasts