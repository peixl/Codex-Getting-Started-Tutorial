type Props = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function StructuredData({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
