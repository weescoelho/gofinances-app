export const collectionsKey = {
  transactions: '@gofinances:transactions',
  user: '@gofinances:user',
  user_transactions: (user_id: string) => {
    return `@gofinances:transactions_user:${user_id}`
  }
}