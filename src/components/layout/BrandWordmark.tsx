export default function BrandWordmark({
  className = '',
}: {
  className?: string
}) {
  return (
    <span
      style={{
        backgroundImage:
          'linear-gradient(135deg, #d8e7ff 0%, #6fa8ff 28%, #3d7dff 52%, #f2c94c 78%, #f59e0b 100%)',
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
