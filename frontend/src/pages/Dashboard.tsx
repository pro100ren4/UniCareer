import { useTranslation } from 'react-i18next'
import { useEffect, useState } from "react"

const Dashboard = () => {
  const { t } = useTranslation()

  useEffect(() => {
  }, [])

  return (
    <div className="">
      { t("login") }
    </div>
  )
}

export default Dashboard
