interface CharacterImageProps {
  data: {
    image: string;
    name: string;
  };
}
const CharacterImage = ({ data }: CharacterImageProps) => {
  return (
    <div style={{ marginRight: '30px' }}>
      <img src={data?.image} alt={data?.name} />
    </div>
  );
};

export default CharacterImage;
