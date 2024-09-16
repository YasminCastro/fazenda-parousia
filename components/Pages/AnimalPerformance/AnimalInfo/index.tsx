export default function AnimalInfo() {
  const TextDetail = ({ title, description }: any) => {
    return (
      <div className="flex gap-1">
        <p className="font-bold">{title}:</p>
        <p>{description}</p>
      </div>
    );
  };

  return (
    <div className="flex justify-center gap-5 text-3xl">
      <TextDetail title="Lactação" description="2°" />
      <TextDetail title="DEL" description="135" />
      <TextDetail title="Produção" description="24kg" />
    </div>
  );
}
