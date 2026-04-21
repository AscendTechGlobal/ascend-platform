export default function BrandWordmark({
  className = '',
}: {
  className?: string
}) {
  return (
    <span
      style={{
        backgroundImage:
          'linear-gradient(135deg, #fef3c7 0%, #fde68a 28%, #60a5fa 52%, #3B82F6 78%, #2563eb 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        textShadow: '0 0 20px rgba(61, 125, 255, 0.12)',
      }}
      className={[
        'inline-block font-semibold tracking-[-0.03em]',
        className,
      ].join(' ')}
    >
      ASCEND TECH GLOBAL
    </span>
  )
}
