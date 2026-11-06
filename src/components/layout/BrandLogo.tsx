/** The logo is square, with its display size set in CSS. */
export function BrandLogo({ loading = 'lazy' }: { loading?: 'eager' | 'lazy' }) {
  return (
    <img
      className="brand-logo"
      src="images/logo.png"
      alt="Career Info-Tech logo"
      width={100}
      height={100}
      loading={loading}
    />
  );
}
