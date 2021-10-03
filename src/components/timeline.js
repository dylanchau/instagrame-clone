import usePhoto from 'hooks/use-photos'

function Timeline() {
  const { photos } = usePhoto()
  console.log(photos)

  return (
    <div className="container col-span-2">
      <p>Timeline</p>
    </div>
  )
}

export default Timeline
