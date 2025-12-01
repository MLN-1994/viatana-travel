import PackageForm from "@/components/PackageForm"

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <PackageForm packageId={id} />
}
