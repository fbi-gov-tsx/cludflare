"use client"

import { Collapsible } from "@/components/ui/collapsible"

import { CollapsibleContent } from "@/components/ui/collapsible"
import { CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Building2,
  Users,
  GraduationCap,
  Briefcase,
  Home,
  Euro,
  Train,
  Settings,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type ChartData,
} from "chart.js"
import { Bar, Scatter, Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const rentalData = [
  { region: "München (Ø)", preis: 20.71, entfernung: 0, einkommen: 4450, lebenshaltung: 1950 },
  { region: "Dachau", preis: 15.80, entfernung: 18, einkommen: 3800, lebenshaltung: 1520 },
  { region: "Freising", preis: 15.50, entfernung: 33, einkommen: 3700, lebenshaltung: 1480 },
  { region: "Ebersberg", preis: 14.90, entfernung: 32, einkommen: 3600, lebenshaltung: 1450 },
  { region: "Fürstenfeldbruck", preis: 16.20, entfernung: 25, einkommen: 3900, lebenshaltung: 1580 },
]

// Münchner Stadtteile - Daten aus mietspiegel_alle.csv (Q3 2025)
const munchenStadtteile = [
  { stadtteil: "Altstadt-Lehel", preis: 24.86, rang: 1, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Ludwigsvorstadt-Isarvorstadt", preis: 24.14, rang: 2, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Au-Haidhausen", preis: 23.57, rang: 3, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Maxvorstadt", preis: 23.54, rang: 4, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Schwabing-West", preis: 23.51, rang: 5, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Neuhausen-Nymphenburg", preis: 22.03, rang: 6, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Schwanthalerhöhe", preis: 21.89, rang: 7, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Schwabing-Freimann", preis: 21.59, rang: 8, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Sendling", preis: 21.05, rang: 9, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Bogenhausen", preis: 20.92, rang: 10, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Untergiesing-Harlaching", preis: 20.87, rang: 11, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Milbertshofen-Am Hart", preis: 20.60, rang: 12, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Sendling-Westpark", preis: 20.14, rang: 13, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Obergiesing-Fasangarten", preis: 19.88, rang: 14, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Moosach", preis: 19.74, rang: 15, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Laim", preis: 19.68, rang: 16, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Thalkirchen-Obersendling-Forstenried-Fürstenried-Solln", preis: 19.66, rang: 17, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Pasing-Obermenzing", preis: 19.64, rang: 18, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Berg am Laim", preis: 19.56, rang: 19, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Hadern", preis: 19.51, rang: 20, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Ramersdorf-Perlach", preis: 19.16, rang: 21, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Trudering-Riem", preis: 19.15, rang: 22, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Feldmoching-Hasenbergl", preis: 18.92, rang: 23, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Allach-Untermenzing", preis: 18.67, rang: 24, region: "München", quartal: "Q3 2025" },
  { stadtteil: "Aubing-Lochhausen-Langwied", preis: 17.98, rang: 25, region: "München", quartal: "Q3 2025" },
]

// Landkreis München Gemeinden - Daten aus mietspiegel_alle.csv (Q3 2025)
const muenchenKreisGemeinden = [
  { gemeinde: "Grünwald", preis: 19.92, rang: 1, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Neubiberg", preis: 18.53, rang: 2, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Baierbrunn", preis: 18.40, rang: 3, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Neuried", preis: 18.39, rang: 4, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Ottobrunn", preis: 18.34, rang: 5, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Unterhaching", preis: 18.21, rang: 6, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Garching bei München", preis: 18.11, rang: 7, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Haar", preis: 18.11, rang: 8, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Planegg", preis: 17.87, rang: 9, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Ismaning", preis: 17.86, rang: 10, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Oberhaching", preis: 17.70, rang: 11, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Unterschleißheim", preis: 17.59, rang: 12, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Taufkirchen", preis: 17.54, rang: 13, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Hohenbrunn", preis: 17.53, rang: 14, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Putzbrunn", preis: 17.24, rang: 15, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Feldkirchen", preis: 17.14, rang: 16, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Aschheim", preis: 16.74, rang: 17, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Grasbrunn", preis: 16.74, rang: 18, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Brunnthal", preis: 15.97, rang: 19, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Sauerlach", preis: 15.32, rang: 20, region: "München-Kreis", quartal: "Q3 2025" },
  { gemeinde: "Aying", preis: 14.20, rang: 21, region: "München-Kreis", quartal: "Q3 2025" },
]

const wohnflaecheData = [
  { stadtteil: "Altstadt-Lehel", wohnflaeche: 46.0 },
  { stadtteil: "Lehel", wohnflaeche: 46.0 },
  { stadtteil: "Bogenhausen", wohnflaeche: 40.0 },
  { stadtteil: "Pasing-Obermenzing", wohnflaeche: 38.5 },
  { stadtteil: "Trudering-Riem", wohnflaeche: 38.5 },
  { stadtteil: "Aubing-Lochhausen-Langwied", wohnflaeche: 38.5 },
  { stadtteil: "Sendling", wohnflaeche: 38.0 },
  { stadtteil: "Sendling-Westpark", wohnflaeche: 38.0 },
  { stadtteil: "Schwanthalerhöhe", wohnflaeche: 37.5 },
  { stadtteil: "Neuhausen-Nymphenburg", wohnflaeche: 37.5 },
  { stadtteil: "Ludwigsvorstadt-Isarvorstadt", wohnflaeche: 37.0 },
  { stadtteil: "Maxvorstadt", wohnflaeche: 37.0 },
  { stadtteil: "Au-Haidhausen", wohnflaeche: 37.0 },
  { stadtteil: "Schwabing-West", wohnflaeche: 36.5 },
  { stadtteil: "Schwabing-Freimann", wohnflaeche: 36.5 },
  { stadtteil: "Untergiesing-Harlaching", wohnflaeche: 36.0 },
  { stadtteil: "Obergiesing-Fasangarten", wohnflaeche: 36.0 },
  { stadtteil: "Ramersdorf-Perlach", wohnflaeche: 35.5 },
  { stadtteil: "Berg am Laim", wohnflaeche: 35.5 },
  { stadtteil: "Laim", wohnflaeche: 35.0 },
  { stadtteil: "Hadern", wohnflaeche: 35.0 },
  { stadtteil: "Moosach", wohnflaeche: 34.5 },
  { stadtteil: "Allach-Untermenzing", wohnflaeche: 34.0 },
  { stadtteil: "Feldmoching-Hasenbergl", wohnflaeche: 33.0 },
  { stadtteil: "Thalkirchen-Obersendling-Forstenried-Fürstenried-Solln", wohnflaeche: 32.0 },
  { stadtteil: "Milbertshofen-Am Hart", wohnflaeche: 27.7 },
]

const muenchenGesamtWohnflaeche = 39.0
/* david füße */
const calculateRegression = () => {
  const n = rentalData.length
  const sumX = rentalData.reduce((acc, d) => acc + d.entfernung, 0)
  const sumY = rentalData.reduce((acc, d) => acc + d.preis, 0)
  const sumXY = rentalData.reduce((acc, d) => acc + d.entfernung * d.preis, 0)
  const sumXX = rentalData.reduce((acc, d) => acc + d.entfernung * d.entfernung, 0)
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n
  
  const meanY = sumY / n
  const ssTotal = rentalData.reduce((acc, d) => acc + Math.pow(d.preis - meanY, 2), 0)
  const ssResidual = rentalData.reduce((acc, d) => {
    const predicted = intercept + slope * d.entfernung
    return acc + Math.pow(d.preis - predicted, 2)
  }, 0)
  const rSquared = 1 - ssResidual / ssTotal
  
  return { slope, intercept, rSquared }
}

const regression = calculateRegression()

const incomePercentageData = rentalData.map(d => {
  const avgApartmentSize = 70
  const monthlyRent = d.preis * avgApartmentSize
  const percentage = (monthlyRent / d.einkommen) * 100
  return {
    region: d.region,
    mietanteil: Math.round(percentage * 10) / 10,
    miete: Math.round(monthlyRent),
    einkommen: d.einkommen,
  }
})

const barChartData: ChartData<"bar"> = {
  labels: rentalData.map(d => d.region),
  datasets: [
    {
      label: "Mietpreis (€/m²)",
      data: rentalData.map(d => d.preis),
      backgroundColor: "rgba(23, 23, 23, 0.1)",
      borderColor: "rgba(23, 23, 23, 0.9)",
      borderWidth: 3,
      borderRadius: 8,
      borderSkipped: false,
    },
  ],
}

const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.95)",
      titleColor: "#fff",
      bodyColor: "#334155",
      borderColor: "rgba(23, 23, 23, 1)",
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: (context) => `  ${context.parsed.y.toFixed(2)} €/m²`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 12,
      max: 25,
      ticks: { color: "#0f172a", font: { size: 11 } },
      grid: { color: "rgba(0, 0, 0, 0.06)" },
      border: { display: false },
    },
    x: {
      ticks: { color: "#0f172a", font: { size: 11 } },
      grid: { color: "rgba(0, 0, 0, 0.06)" },
      border: { display: false },
    },
  },
}

export default function RentalAnalysisPage() {
  const [selectedRegion, setSelectedRegion] = useState("München (Ø)")
  const [apartmentSize, setApartmentSize] = useState([70])
  const [selectedPersonType, setSelectedPersonType] = useState("familie")
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const incomeByType: Record<string, number> = {
    familie: 5200,      // Familieneinkommen 2025/2026
    student: 1050,      // BAföG Höchstsatz + Nebenjob 2025
    azubi: 1180,        // Durchschnittliche Ausbildungsvergütung 2025
    single: 3100,       // Durchschnittliches Nettoeinkommen Single 2025
  }

  const currentIncome = incomeByType[selectedPersonType]
  
const selectedRegionData = rentalData.find(d => d.region === selectedRegion)
  const selectedStadtteilData = munchenStadtteile.find(d => d.stadtteil === selectedRegion)
  const selectedGemeindeData = muenchenKreisGemeinden.find(d => d.gemeinde === selectedRegion)
  const selectedPrice = selectedRegionData?.preis ?? selectedStadtteilData?.preis ?? selectedGemeindeData?.preis ?? 20.71
  
  const calculatedRent = selectedPrice * apartmentSize[0]
  const rentPercentage = (calculatedRent / currentIncome) * 100

  const munichPrice = rentalData.find(d => d.region === "München (Ø)")?.preis || 20.71
  const percentageDifferences = rentalData.map(d => ({
    region: d.region,
    differenz: d.region === "München (Ø)" ? 0 : Math.round(((munichPrice - d.preis) / munichPrice) * 100),
  }))

  const colors = {
    primary: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
    primaryLight: theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "rgba(23, 23, 23, 0.85)",
    primaryFaded: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(23, 23, 23, 0.15)",
    secondary: theme === "dark" ? "rgba(163, 163, 163, 1)" : "rgba(115, 115, 115, 1)",
    secondaryLight: theme === "dark" ? "rgba(163, 163, 163, 0.8)" : "rgba(115, 115, 115, 0.8)",
    accent: theme === "dark" ? "rgba(229, 229, 229, 1)" : "rgba(64, 64, 64, 1)",
    accentLight: theme === "dark" ? "rgba(229, 229, 229, 0.8)" : "rgba(64, 64, 64, 0.85)",
    success: theme === "dark" ? "rgba(212, 212, 212, 1)" : "rgba(82, 82, 82, 1)",
    successLight: theme === "dark" ? "rgba(212, 212, 212, 0.8)" : "rgba(82, 82, 82, 0.8)",
    danger: theme === "dark" ? "rgba(250, 250, 250, 1)" : "rgba(38, 38, 38, 1)",
    dangerLight: theme === "dark" ? "rgba(250, 250, 250, 0.8)" : "rgba(38, 38, 38, 0.85)",
  }

  const textColor = theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)"
  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"

  const mietpreiseLineData: ChartData<"line"> = {
    labels: rentalData.map(d => d.region),
    datasets: [
      {
        label: "Mietpreis (€/m²)",
        data: rentalData.map(d => d.preis),
        backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(23, 23, 23, 0.1)",
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(23, 23, 23, 0.9)",
        borderWidth: 3,
        pointBackgroundColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        pointBorderColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        pointRadius: 6,
        pointHoverRadius: 9,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const mietpreiseLineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)",
        titleColor: theme === "dark" ? "#fff" : "#0f172a",
        bodyColor: theme === "dark" ? "rgba(255,255,255,0.8)" : "#334155",
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: { weight: "bold" as const, size: 13 },
        bodyFont: { size: 12 },
        callbacks: {
          label: (context) => `  ${context.parsed.y.toFixed(2)} €/m²`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 12,
        max: 25,
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
        border: { display: false },
      },
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
        border: { display: false },
      },
    },
  }

  const diffBarChartData: ChartData<"bar"> = {
    labels: percentageDifferences.filter(d => d.region !== "München (Ø)").map(d => d.region),
    datasets: [
      {
        label: "Ersparnis (%)",
        data: percentageDifferences.filter(d => d.region !== "München (Ø)").map(d => d.differenz),
        backgroundColor: theme === "dark" ? "rgba(200, 200, 200, 0.9)" : "rgba(80, 80, 80, 0.9)",
        borderColor: theme === "dark" ? "rgba(220, 220, 220, 1)" : "rgba(60, 60, 60, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  }

  const diffBarChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)",
        titleColor: theme === "dark" ? "#fff" : "#0f172a",
        bodyColor: theme === "dark" ? "rgba(255,255,255,0.8)" : "#334155",
        borderColor: colors.success,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `  ${context.parsed.y}% günstiger als München`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35,
        ticks: { color: textColor, font: { size: 11 }, callback: (value) => `${value}%` },
        grid: { color: gridColor },
        border: { display: false },
      },
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { display: false },
        border: { display: false },
      },
    },
  }

  const diffLineData: ChartData<"line"> = {
    labels: percentageDifferences.filter(d => d.region !== "München (Ø)").map(d => d.region),
    datasets: [
      {
        label: "Ersparnis (%)",
        data: percentageDifferences.filter(d => d.region !== "München (Ø)").map(d => d.differenz),
        backgroundColor: theme === "dark" ? "rgba(200, 200, 200, 0.15)" : "rgba(80, 80, 80, 0.15)",
        borderColor: theme === "dark" ? "rgba(220, 220, 220, 1)" : "rgba(60, 60, 60, 1)",
        borderWidth: 3,
        pointBackgroundColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        pointBorderColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        pointRadius: 6,
        pointHoverRadius: 9,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const diffLineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)",
        titleColor: theme === "dark" ? "#fff" : "#0f172a",
        bodyColor: theme === "dark" ? "rgba(255,255,255,0.8)" : "#334155",
        borderColor: colors.success,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `  ${context.parsed.y}% günstiger als München`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 35,
        ticks: { color: textColor, font: { size: 11 }, callback: (value) => `${value}%` },
        grid: { color: gridColor },
        border: { display: false },
      },
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
        border: { display: false },
      },
    },
  }

  const scatterChartData: ChartData<"scatter"> = {
    datasets: [
      {
        label: "Regionen",
        data: rentalData.map(d => ({ x: d.entfernung, y: d.preis })),
        backgroundColor: rentalData.map(d => 
          d.region === "München (Ø)" 
            ? (theme === "dark" ? "rgba(255, 255, 255, 0.95)" : "rgba(23, 23, 23, 0.95)")
            : (theme === "dark" ? "rgba(180, 180, 180, 0.9)" : "rgba(100, 100, 100, 0.9)")
        ),
        borderColor: rentalData.map(d => 
          d.region === "München (Ø)" 
            ? (theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)")
            : (theme === "dark" ? "rgba(220, 220, 220, 1)" : "rgba(60, 60, 60, 1)")
        ),
        borderWidth: 3,
        pointRadius: 12,
        pointHoverRadius: 16,
        pointStyle: 'circle',
      },
      {
        label: "Trendlinie",
        data: [
          { x: 0, y: regression.intercept },
          { x: 35, y: regression.intercept + regression.slope * 35 },
        ],
        backgroundColor: "transparent",
        borderColor: theme === "dark" ? "rgba(140, 140, 140, 1)" : "rgba(150, 150, 150, 1)",
        borderWidth: 3,
        borderDash: [8, 4],
        pointRadius: 0,
        showLine: true,
        type: "line" as const,
      },
    ],
  }

  const scatterChartOptions: ChartOptions<"scatter"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: { 
          color: textColor,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)",
        titleColor: theme === "dark" ? "#fff" : "#0f172a",
        bodyColor: theme === "dark" ? "rgba(255,255,255,0.8)" : "#334155",
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex
            if (context.datasetIndex === 0) {
              const region = rentalData[dataIndex]?.region || ""
              return `  ${region}: ${context.parsed.x} km | ${context.parsed.y.toFixed(2)} €/m²`
            }
            return ""
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear" as const,
        position: "bottom" as const,
        min: -2,
        max: 40,
        title: {
          display: true,
          text: "Entfernung von München (km)",
          color: textColor,
          font: { size: 12, weight: "bold" as const },
        },
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
        border: { display: false },
      },
      y: {
        min: 10,
        max: 25,
        title: {
          display: true,
          text: "Mietpreis (€/m²)",
          color: textColor,
          font: { size: 12, weight: "bold" as const },
        },
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
        border: { display: false },
      },
    },
  }

  const incomeLineData: ChartData<"line"> = {
    labels: incomePercentageData.map(d => d.region),
    datasets: [
      {
        label: "Mietanteil (%)",
        data: incomePercentageData.map(d => d.mietanteil),
        backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(23, 23, 23, 0.1)",
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(23, 23, 23, 0.9)",
        borderWidth: 3,
        pointBackgroundColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        pointBorderColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        pointRadius: 6,
        pointHoverRadius: 9,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const incomeLineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)",
        titleColor: theme === "dark" ? "#fff" : "#0f172a",
        bodyColor: theme === "dark" ? "rgba(255,255,255,0.8)" : "#334155",
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const status = context.parsed.y > 30 ? " (kritisch)" : " (gesund)"
            return `  ${context.parsed.y}% des Einkommens${status}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: { color: textColor, font: { size: 11 }, callback: (value) => `${value}%` },
        grid: { color: gridColor },
        border: { display: false },
      },
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
        border: { display: false },
      },
    },
  }

  const incomeBarChartData: ChartData<"bar"> = {
    labels: incomePercentageData.map(d => d.region),
    datasets: [
      {
        label: "Mietanteil (%)",
        data: incomePercentageData.map(d => d.mietanteil),
        backgroundColor: incomePercentageData.map(d => 
          d.mietanteil > 30 
            ? (theme === "dark" ? "rgba(250, 250, 250, 0.9)" : "rgba(38, 38, 38, 0.9)")
            : (theme === "dark" ? "rgba(212, 212, 212, 0.9)" : "rgba(82, 82, 82, 0.9)")
        ),
        borderColor: incomePercentageData.map(d => 
          d.mietanteil > 30 
            ? (theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)")
            : (theme === "dark" ? "rgba(230, 230, 230, 1)" : "rgba(60, 60, 60, 1)")
        ),
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  }

  const incomeBarChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)",
        titleColor: theme === "dark" ? "#fff" : "#0f172a",
        bodyColor: theme === "dark" ? "rgba(255,255,255,0.8)" : "#334155",
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const status = context.parsed.y > 30 ? " (kritisch)" : " (gesund)"
            return `  ${context.parsed.y}% des Einkommens${status}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: { color: textColor, font: { size: 11 }, callback: (value) => `${value}%` },
        grid: { color: gridColor },
        border: { display: false },
      },
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { display: false },
        border: { display: false },
      },
    },
  }

  const sortedWohnflaeche = [...wohnflaecheData].sort((a, b) => b.wohnflaeche - a.wohnflaeche)
  
  const wohnflaecheChartData: ChartData<"line"> = {
    labels: sortedWohnflaeche.map(d => d.stadtteil.length > 18 ? d.stadtteil.substring(0, 15) + "..." : d.stadtteil),
    datasets: [
      {
        label: "Wohnfläche pro Person (m²)",
        data: sortedWohnflaeche.map(d => d.wohnflaeche),
        backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(23, 23, 23, 0.1)",
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(23, 23, 23, 0.9)",
        borderWidth: 2,
        pointBackgroundColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        pointBorderColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const wohnflaecheChartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)",
        titleColor: theme === "dark" ? "#fff" : "#0f172a",
        bodyColor: theme === "dark" ? "rgba(255,255,255,0.8)" : "#334155",
        borderColor: theme === "dark" ? "rgba(200, 200, 200, 1)" : "rgba(80, 80, 80, 1)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          title: (items) => {
            const index = items[0].dataIndex
            return sortedWohnflaeche[index].stadtteil
          },
          label: (context) => `  ${context.parsed.y.toFixed(1)} m² pro Person`,
        },
      },
    },
    scales: {
      x: {
        ticks: { 
          color: textColor, 
          font: { size: 9 },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        beginAtZero: false,
        min: 25,
        max: 50,
        ticks: { color: textColor, font: { size: 10 }, callback: (value) => `${value} m²` },
        grid: { color: gridColor },
        border: { display: false },
      },
    },
  }

  const livingCostsLineData: ChartData<"line"> = {
    labels: rentalData.map(d => d.region),
    datasets: [
      {
        label: "Miete (70m²)",
        data: rentalData.map(d => Math.round(d.preis * 70)),
        backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(23, 23, 23, 0.1)",
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(23, 23, 23, 0.9)",
        borderWidth: 3,
        pointBackgroundColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        pointBorderColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Sonstige Lebenshaltungskosten",
        data: rentalData.map(d => d.lebenshaltung),
        backgroundColor: theme === "dark" ? "rgba(140, 140, 140, 0.1)" : "rgba(140, 140, 140, 0.1)",
        borderColor: theme === "dark" ? "rgba(160, 160, 160, 1)" : "rgba(120, 120, 120, 1)",
        borderWidth: 3,
        borderDash: [5, 5],
        pointBackgroundColor: theme === "dark" ? "rgba(180, 180, 180, 1)" : "rgba(100, 100, 100, 1)",
        pointBorderColor: theme === "dark" ? "rgba(180, 180, 180, 1)" : "rgba(100, 100, 100, 1)",
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: false,
      },
    ],
  }

  const livingCostsLineOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: { 
          color: textColor,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)",
        titleColor: theme === "dark" ? "#fff" : "#0f172a",
        bodyColor: theme === "dark" ? "rgba(255,255,255,0.8)" : "#334155",
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `  ${context.dataset.label}: ${context.parsed.y.toLocaleString()}€`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: textColor, font: { size: 11 }, callback: (value) => `${value}€` },
        grid: { color: gridColor },
        border: { display: false },
      },
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor },
        border: { display: false },
      },
    },
  }

  const livingCostsChartData: ChartData<"bar"> = {
    labels: rentalData.map(d => d.region),
    datasets: [
      {
        label: "Miete (70m²)",
        data: rentalData.map(d => Math.round(d.preis * 70)),
        backgroundColor: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(23, 23, 23, 0.9)",
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgba(23, 23, 23, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: "Sonstige Lebenshaltungskosten",
        data: rentalData.map(d => d.lebenshaltung),
        backgroundColor: theme === "dark" ? "rgba(160, 160, 160, 0.9)" : "rgba(120, 120, 120, 0.9)",
        borderColor: theme === "dark" ? "rgba(180, 180, 180, 1)" : "rgba(100, 100, 100, 1)",
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  }

  const livingCostsChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
        labels: { 
          color: textColor,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: theme === "dark" ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.98)",
        titleColor: theme === "dark" ? "#fff" : "#0f172a",
        bodyColor: theme === "dark" ? "rgba(255,255,255,0.8)" : "#334155",
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `  ${context.dataset.label}: ${context.parsed.y.toLocaleString()}€`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: textColor, font: { size: 11 }, callback: (value) => `${value}€` },
        grid: { color: gridColor },
        border: { display: false },
      },
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { display: false },
        border: { display: false },
      },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">Lebenshaltungskosten & Mietpreise</span>
          </div>
          <nav className="flex items-center gap-4">
            <Badge variant="outline" className="text-xs hidden md:inline-flex">
              {"Felix - David - Peter - Krystian - Kilian"}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Einstellungen</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Einstellungen</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <p className="text-sm font-medium mb-2">Theme</p>
                  <div className="flex gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4 mr-2" />
                      Hell
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      Dunkel
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      <main>
        {/* hero felix */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
              <Badge variant="secondary" className="text-xs">
                Schulprojekt - Datenanalyse 2025/2026
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                Lebenshaltungskosten und Mietpreise
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl text-balance">
                Analyse von Miet- und Lebenshaltungskosten in München im Vergleich zu umliegenden Gemeinden. Basierend auf dem Mietspiegel 2026 und aktuellen Einkommensdaten 2025/2026.
              </p>
              <div className="flex gap-4 mt-2">
                
                
              </div>
            </div>
          </div>
        </section>

        {/* daten collection felix */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">1. Datensammlung</h2>
              <p className="text-muted-foreground">
                Erhobene Daten: Lebenshaltungskosten, Mietpreise und durchschnittliches Einkommen
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {rentalData.map((d) => (
                <Card key={d.region} className={d.region === "München (Ø)" ? "ring-2 ring-primary" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <CardTitle className="text-base">{d.region}</CardTitle>
                    </div>
                    {d.region === "München (Ø)" && (
                      <Badge variant="secondary" className="w-fit text-xs">Referenz</Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Miete/m²:</span>
                      <span className="font-medium">{d.preis.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Einkommen:</span>
                      <span className="font-medium">{d.einkommen.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Entfernung:</span>
                      <span className="font-medium">{d.entfernung} km</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* david mietspiegel daten */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-16">
            <Collapsible>
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-6 hover:bg-muted/50 rounded-lg border cursor-pointer transition-colors">
                  <div className="text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">Münchner Mietspiegel 2026</h2>
                    <p className="text-muted-foreground text-sm">
                      Durchschnittliche Mietpreise nach 25 Stadtteilen - Klicken zum Anzeigen
                    </p>
                  </div>
                  <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-6 data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                  {munchenStadtteile.map((d) => (
                    <Card key={d.stadtteil} className={d.rang <= 5 ? "ring-1 ring-primary/50" : ""}>
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">#{d.rang}</p>
                            <p className="text-sm font-medium truncate" title={d.stadtteil}>
                              {d.stadtteil.length > 25 ? d.stadtteil.substring(0, 22) + "..." : d.stadtteil}
                            </p>
                          </div>
                          <p className="text-lg font-bold whitespace-nowrap">{d.preis.toFixed(2)}€</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
<p className="text-sm text-muted-foreground mt-6 text-center">
                  Quelle: mietspiegel_alle.csv (Q3 2025) | Durchschnitt München: 20,71 €/m²
                </p>
              </CollapsibleContent>
            </Collapsible>

            {/* Landkreis München Gemeinden */}
            <Collapsible className="mt-8">
              <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-6 hover:bg-muted/50 rounded-lg border cursor-pointer transition-colors">
                  <div className="text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">Landkreis München Gemeinden</h2>
                    <p className="text-muted-foreground text-sm">
                      Mietpreise in 21 Gemeinden im Münchner Umland - Klicken zum Anzeigen
                    </p>
                  </div>
                  <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-6 data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                  {muenchenKreisGemeinden.map((d) => (
                    <Card key={d.gemeinde} className={d.rang <= 5 ? "ring-1 ring-primary/50" : ""}>
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-0.5">#{d.rang}</p>
                            <p className="text-sm font-medium truncate" title={d.gemeinde}>
                              {d.gemeinde.length > 25 ? d.gemeinde.substring(0, 22) + "..." : d.gemeinde}
                            </p>
                          </div>
                          <p className="text-lg font-bold whitespace-nowrap">{d.preis.toFixed(2)}€</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-6 text-center">
                  Quelle: mietspiegel_alle.csv (Q3 2025) | Durchschnitt Landkreis: 17,42 €/m²
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* mathematische analyse */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">2. Mathematische Bearbeitung</h2>
              <p className="text-muted-foreground">
                Durchschnittliche Mietpreise, prozentuale Unterschiede und statistische Auswertung
              </p>
            </div>

            <Tabs defaultValue="barchart" className="space-y-6">
              <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5">
                <TabsTrigger value="barchart">Mietpreise</TabsTrigger>
                <TabsTrigger value="differenz">Differenz</TabsTrigger>
                <TabsTrigger value="regression">Regression</TabsTrigger>
                <TabsTrigger value="einkommen">Einkommen</TabsTrigger>
                <TabsTrigger value="wohnflaeche">Wohnfläche</TabsTrigger>
              </TabsList>

              {/* bar chart mietpreise */}
              <TabsContent value="barchart">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Durchschnittliche Mietpreise (€/m²)</CardTitle>
                    <CardDescription>Darstellung der Mietpreise im Liniendiagramm</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <Line data={mietpreiseLineData} options={mietpreiseLineOptions} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* prozent dings */}
              <TabsContent value="differenz">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Prozentuale Unterschiede zu München</CardTitle>
                    <CardDescription>Wie viel günstiger ist das Umland im Vergleich zu München?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {percentageDifferences.filter(d => d.region !== "München (Ø)").map((d) => (
                        <Card key={d.region} className="bg-muted/50">
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">{d.region}</p>
                              <p className="text-3xl font-bold text-emerald-600">-{d.differenz}%</p>
                              <p className="text-xs text-muted-foreground mt-1">günstiger als München</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="h-[300px]">
                      <Line data={diffLineData} options={diffLineOptions} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* lineare age regression */}
              <TabsContent value="regression">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Lineare Regression: Entfernung zu München vs. Mietpreis</CardTitle>
                    <CardDescription>
                      Zeigt sich ein Zusammenhang zwischen der Entfernung von München und dem Mietpreis?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">Bestimmtheitsmaß</p>
                            <p className="text-3xl font-bold">R² = {(regression.rSquared).toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {regression.rSquared > 0.7 ? "Starker Zusammenhang" : "Moderater Zusammenhang"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">Steigung</p>
                            <p className="text-3xl font-bold">{regression.slope.toFixed(3)}</p>
                            <p className="text-xs text-muted-foreground mt-1">€/m² pro km Entfernung</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-1">Y-Achsenabschnitt</p>
                            <p className="text-3xl font-bold">{regression.intercept.toFixed(2)}€</p>
                            <p className="text-xs text-muted-foreground mt-1">Basispreis bei 0 km</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="h-[400px]">
                      <Scatter data={scatterChartData} options={scatterChartOptions} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Regressionsgleichung: Mietpreis = {regression.intercept.toFixed(2)} + ({regression.slope.toFixed(3)}) × Entfernung
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* felix */}
              <TabsContent value="einkommen">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mietanteil am Einkommen</CardTitle>
                    <CardDescription>
                      Berechnung, wie viel Prozent des Einkommens für Miete verwendet werden müssten (70m² Wohnung)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                      {incomePercentageData.map((d) => (
                        <Card key={d.region} className={`${d.mietanteil > 30 ? "border-destructive" : "border-emerald-500"} border-2`}>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">{d.region}</p>
                              <p className={`text-3xl font-bold ${d.mietanteil > 30 ? "text-destructive" : "text-emerald-600"}`}>
                                {d.mietanteil}%
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {d.miete.toLocaleString()}€ / {d.einkommen.toLocaleString()}€
                              </p>
                              {d.mietanteil > 30 && (
                                <Badge variant="destructive" className="mt-2 text-xs">Über 30% Regel</Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <div className="h-[300px]">
                      <Line data={incomeLineData} options={incomeLineOptions} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Die 30%-Regel besagt, dass maximal 30% des Nettoeinkommens für Miete ausgegeben werden sollte.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* wohnfläche pro person david */}
              <TabsContent value="wohnflaeche">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Wohnfläche pro Person nach Stadtteil</CardTitle>
                    <CardDescription>
                      Durchschnittliche Wohnfläche pro Person in den Münchner Stadtteilen (in m²)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 pb-4">
                          <p className="text-xs text-muted-foreground">München Gesamt</p>
                          <p className="text-2xl font-bold">{muenchenGesamtWohnflaeche} m²</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 pb-4">
                          <p className="text-xs text-muted-foreground">Höchste</p>
                          <p className="text-2xl font-bold">{sortedWohnflaeche[0].wohnflaeche} m²</p>
                          <p className="text-xs text-muted-foreground truncate">{sortedWohnflaeche[0].stadtteil}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 pb-4">
                          <p className="text-xs text-muted-foreground">Niedrigste</p>
                          <p className="text-2xl font-bold">{sortedWohnflaeche[sortedWohnflaeche.length - 1].wohnflaeche} m²</p>
                          <p className="text-xs text-muted-foreground truncate">{sortedWohnflaeche[sortedWohnflaeche.length - 1].stadtteil}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 pb-4">
                          <p className="text-xs text-muted-foreground">Differenz</p>
                          <p className="text-2xl font-bold">{(sortedWohnflaeche[0].wohnflaeche - sortedWohnflaeche[sortedWohnflaeche.length - 1].wohnflaeche).toFixed(1)} m²</p>
                          <p className="text-xs text-muted-foreground">Spannweite</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="h-[700px]">
                      <Line data={wohnflaecheChartData} options={wohnflaecheChartOptions} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Daten zeigen die durchschnittliche Wohnfläche pro Person in den jeweiligen Stadtteilen.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* mieten rechner dings felix */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Interaktiver Mietrechner</h2>
              <p className="text-muted-foreground">
                Berechnen Sie den Mietanteil für verschiedene Personengruppen
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Parameter anpassen</CardTitle>
                  <CardDescription>Wählen Sie Region, Wohnungsgröße und Personentyp</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Region</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Umland</div>
                        {rentalData.map((d) => (
                          <SelectItem key={d.region} value={d.region}>{d.region} - {d.preis.toFixed(2)}€/m²</SelectItem>
                        ))}
<div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">München Stadtteile</div>
                        {munchenStadtteile.map((d) => (
                          <SelectItem key={d.stadtteil} value={d.stadtteil}>{d.stadtteil} - {d.preis.toFixed(2)}€/m²</SelectItem>
                        ))}
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-1 pt-2">Landkreis München</div>
                        {muenchenKreisGemeinden.map((d) => (
                          <SelectItem key={d.gemeinde} value={d.gemeinde}>{d.gemeinde} - {d.preis.toFixed(2)}€/m²</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Wohnungsgröße:</label>
                      <span className="text-sm text-muted-foreground">{apartmentSize[0]} m²</span>
                    </div>
                    <Slider value={apartmentSize} onValueChange={setApartmentSize} min={20} max={120} step={5} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Personentyp</label>
                    <Select value={selectedPersonType} onValueChange={setSelectedPersonType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="familie">Familie (2 Einkommen)</SelectItem>
                        <SelectItem value="single">Single (Berufstätig)</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="azubi">Auszubildender</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Durchschnittliches Einkommen: {currentIncome.toLocaleString()}€/Monat
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ergebnis</CardTitle>
                  <CardDescription>Berechneter Mietanteil am Einkommen</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Kalte Monatliche Miete</p>
                      <p className="text-2xl font-bold">{calculatedRent.toLocaleString()}€</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Einkommen</p>
                      <p className="text-2xl font-bold">{currentIncome.toLocaleString()}€</p>
                    </div>
                  </div>
                  {(() => {
                    const wohnflaecheEntry = wohnflaecheData.find(w => w.stadtteil === selectedRegion)
                    if (wohnflaecheEntry) {
                      return (
                        <div className="text-center p-4 bg-muted/30 rounded-lg border">
                          <p className="text-sm text-muted-foreground mb-1">Durchschnittliche Wohnfläche pro Person</p>
                          <p className="text-2xl font-bold">{wohnflaecheEntry.wohnflaeche} m²</p>
                          <p className="text-xs text-muted-foreground mt-1">in {selectedRegion}</p>
                        </div>
                      )
                    }
                    return null
                  })()}
                  <div className={`text-center p-6 rounded-lg ${rentPercentage > 30 ? "bg-destructive/10" : "bg-emerald-500/10"}`}>
                    <p className="text-sm text-muted-foreground mb-1">Mietanteil am Einkommen</p>
                    <p className={`text-4xl font-bold ${rentPercentage > 30 ? "text-destructive" : "text-emerald-600"}`}>
                      {rentPercentage.toFixed(1)}%
                    </p>
                    {rentPercentage > 30 ? (
                      <Badge variant="destructive" className="mt-2">Über der empfohlenen 30% Grenze</Badge>
                    ) : (
                      <Badge variant="secondary" className="mt-2 text-emerald-600 bg-emerald-100">Im gesunden Bereich</Badge>
                    )}
                  </div>
                  {rentPercentage > 50 && (
                    <p className="text-sm text-destructive text-center">
                      Achtung: Bei über 50% des Einkommens für Miete bleibt kaum Geld für andere Lebenshaltungskosten!
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* interpretation felix */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">3. Interpretation</h2>
              <p className="text-muted-foreground">
                Warum ist München teurer? Welche Faktoren haben Einfluss?
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Preistreibende Faktoren in München
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Nähe zum Arbeitsplatz</p>
                        <p className="text-sm text-muted-foreground">Viele Unternehmen und Jobs direkt in der Stadt</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Train className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Gute Verkehrsanbindung</p>
                        <p className="text-sm text-muted-foreground">U-Bahn, S-Bahn, Tram - alles verfügbar</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Attraktivität & Infrastruktur</p>
                        <p className="text-sm text-muted-foreground">Kultur, Freizeit, Einkaufsmöglichkeiten</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Hohe Nachfrage</p>
                        <p className="text-sm text-muted-foreground">Begrenzter Wohnraum bei steigender Bevölkerung</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Vorteile des Umlands
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Euro className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Günstigere Mieten</p>
                        <p className="text-sm text-muted-foreground">Bis zu 33% Ersparnis gegenüber München</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Home className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Mehr Wohnfläche</p>
                        <p className="text-sm text-muted-foreground">Größere Wohnungen zum gleichen Preis</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Train className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">S-Bahn-Anbindung</p>
                        <p className="text-sm text-muted-foreground">Schnelle Verbindung nach München</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Ruhigere Umgebung</p>
                        <p className="text-sm text-muted-foreground">Bessere Lebensqualität für Familien</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* folgen personengruppen felix */}
            <h3 className="text-xl font-bold mb-6 text-center">Folgen für verschiedene Personengruppen</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Familien</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Familien benötigen größere Wohnungen (80-100m²), was in München schnell über 2.000€ Miete bedeutet.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>München (90m²):</span>
                      <span className="font-medium text-destructive">1.935€</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Dachau (90m²):</span>
                      <span className="font-medium text-emerald-600">1.386€</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Ersparnis: 549€/Monat = 6.588€/Jahr
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Studierende</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Mit durchschnittlich 950€ Budget ist eine eigene Wohnung in München kaum finanzierbar.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>München (30m²):</span>
                      <span className="font-medium text-destructive">645€ (68%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Freising (30m²):</span>
                      <span className="font-medium text-emerald-600">453€ (48%)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Lösung: WG oder Studentenwohnheim
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Auszubildende</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    Mit ca. 1.100€ Vergütung ist eigenständiges Wohnen fast unmöglich.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>München (25m²):</span>
                      <span className="font-medium text-destructive">538€ (49%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Ebersberg (25m²):</span>
                      <span className="font-medium text-emerald-600">363€ (33%)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Viele wohnen noch bei den Eltern
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* lebenshaltungskosten felix */}
        <section className="border-b">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Gesamte Lebenshaltungskosten</h2>
              <p className="text-muted-foreground">
                Vergleich von Miete und sonstigen Lebenshaltungskosten pro Monat
              </p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Miete (70m²) + sonstige Lebenshaltungskosten</CardTitle>
                <CardDescription>Durchschnittliche monatliche Gesamtkosten</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Line data={livingCostsLineData} options={livingCostsLineOptions} />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer geile felix füße */}
        <footer className="py-6">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>Felix Seibel &copy; PP</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
