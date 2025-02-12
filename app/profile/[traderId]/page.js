import TraderProfile from "../../../components/TraderProfile"

export default function TraderPage({ params }) {
  return <TraderProfile traderId={params.traderId} />
}
