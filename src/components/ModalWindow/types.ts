export type Data = {
  rating?: string
  label?: string
}

export type renderFunction = ({ data, setData }: { data: Data; setData: (data: Data) => void }) => JSX.Element
