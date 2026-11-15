import { ref } from 'vue'

export function useNewsDialog() {
  const feedbackDialog = ref(null)
  const errorMessage = ref('')

  function openDialog(error = '') {
    errorMessage.value = error
    feedbackDialog.value?.showModal()
  }

  function closeDialog() {
    feedbackDialog.value?.close()
    errorMessage.value = ''
  }

  return {
    feedbackDialog,
    errorMessage,
    openDialog,
    closeDialog,
  }
}
