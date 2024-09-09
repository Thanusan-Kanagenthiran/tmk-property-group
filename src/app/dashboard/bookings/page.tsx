import BookingList from "./BookingList"

export default async function Page() {
  let data = await fetch('http://localhost:3000/api/auth/session')
  let session = await data.json()

  console.log(session)
  return (
    <ul>
      <BookingList />
    </ul>
  )
}