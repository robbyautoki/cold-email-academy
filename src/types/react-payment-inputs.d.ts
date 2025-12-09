declare module 'react-payment-inputs' {
  export function usePaymentInputs(): {
    getCardNumberProps: (props?: Record<string, unknown>) => Record<string, unknown>
    getExpiryDateProps: (props?: Record<string, unknown>) => Record<string, unknown>
    getCVCProps: (props?: Record<string, unknown>) => Record<string, unknown>
    getCardImageProps: (props?: { images?: Record<string, unknown> }) => Record<string, unknown>
    meta: {
      erroredInputs: Record<string, boolean>
      cardType: { type: string } | null
    }
  }

  export const PaymentInputsWrapper: React.FC<{
    children: React.ReactNode
  }>

  export const PaymentInputsContainer: React.FC<{
    children: React.ReactNode
  }>
}

declare module 'react-payment-inputs/images' {
  export type CardImages = Record<string, React.FC<React.SVGProps<SVGSVGElement>>>
  const images: CardImages
  export default images
}
