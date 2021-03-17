import { loadStripe } from "@stripe/stripe-js"
let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51IVJ3xJdVBka0wzfddSnmUd9i8dS6ELo7gyXvqTmny5z4DdMkjDTIgpLPoeEuDbChJoSQnLKpyd06fFzrbAPxxNn00BYB5SYxJ"
    )
  }
  return stripePromise
}
export default getStripe
