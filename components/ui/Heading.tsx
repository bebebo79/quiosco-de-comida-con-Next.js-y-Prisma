

export default function Heading({children} : {children : React.ReactNode}) {
  return (
    <h1 className="text-4xl my-5">
        {children}
    </h1>
  )
}
