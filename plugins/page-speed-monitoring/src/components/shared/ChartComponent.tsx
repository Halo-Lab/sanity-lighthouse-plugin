import {useCallback, useState, useRef, memo} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import {CATEGORIES, CATEGORIES_TITLE, COLORS_BAR} from '../../helpers/constants'
import {filterDates} from '../../helpers/functions'
import {DatePickerComponentMemo} from './DatePickerComponent'
import {Flex} from '@sanity/ui'
import {CustomCheckBox} from './CustomCheckBox'
import {ContainerChartLine, TitleSection} from '../../styles/ChartComponentStyle'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
)

type ChartPropsType = {
  history: (string | number[])[]
  markDatesList: string[]
}

const ChartComponent = ({history, markDatesList = []}: ChartPropsType) => {
  const chartRef = useRef(null)
  const [value, onChange] = useState<Date | null>(null)
  const [isCheckedList, setIsCheckedList] = useState<string[]>([])
  const labelList = Boolean(history?.length)
    ? history.length > 1
      ? [...history.map((dateReq) => dateReq[0])]
      : ['', ...history.map((dataReq) => dataReq[0]), '']
    : []

  const dataSetList = Boolean(history?.length)
    ? history.length > 1
      ? [
          ...CATEGORIES.map((category: string, idx: number) => {
            return {
              type: 'line',
              label: category,
              data: [...history.map((it) => it[idx + 1])],
              borderWidth: 3,
              backgroundColor: COLORS_BAR[idx],
              borderColor: COLORS_BAR[idx],
              tension: 0.1,
            }
          }),
        ]
      : [
          ...CATEGORIES.map((category: string, idx: number) => {
            return {
              type: 'line',
              label: category,
              data: [null, ...history.map((it) => it[idx + 1]), null],
              borderWidth: 6,
              backgroundColor: COLORS_BAR[idx],
            }
          }),
        ]
    : []

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: false,
        text: 'Request History',
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#8083A3',
        bodyColor: '#02021E',
        borderColor: 'rgba(228, 230, 232, 0.4)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        // beginAtZero: true,
        border: {
          dash: [8, 4],
        },
      },
      x: {
        grid: {
          display: false,
          borderDash: [8, 4],
        },
        ticks: {
          callback: function (index, values) {
            if (labelList.length === 3) {
              return Boolean(index === 0 || index === values.length - 1)
                ? (labelList[1] as string).split(',')[0]
                : ''
            }
            if (index === 0 || index === values.length - 1) {
              const valueText = (labelList[index] as string).split(',')[0]
              return valueText
            }
            return ''
          },
        },
      },
    },
  }

  const renderDatePickerComponent = useCallback(() => {
    return (
      <DatePickerComponentMemo value={value} onChange={onChange} markDateList={markDatesList} />
    )
  }, [markDatesList, value])

  const renderCustomCheckBox = useCallback(() => {
    const updateChart = (target: number, chart: any, name: string) => {
      const isDataShow = chart.isDatasetVisible(target)

      if (isDataShow === false) {
        chart.show(target)
        setIsCheckedList((prev) => prev.filter((it) => it !== name))
      }
      if (isDataShow === true) {
        chart.hide(target)
        setIsCheckedList([...isCheckedList, name])
      }
    }

    return CATEGORIES_TITLE.map((item, idx) => {
      return (
        <Flex key={`${item}-${idx}`} align="center">
          <CustomCheckBox
            label={item}
            checked={!Boolean(isCheckedList?.includes(item))}
            handleChange={({currentTarget}) =>
              updateChart(currentTarget.id, chartRef.current, item)
            }
            id={idx}
          />
        </Flex>
      )
    })
  }, [isCheckedList])

  const hoverLine = {
    id: 'hoverLine',
    afterDatasetsDraw(chart) {
      const {
        ctx,
        tooltip,
        chartArea: {top, left, right, bottom, width, height},
        scales: {x, y},
      } = chart

      if (tooltip._active.length > 0) {
        const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex)
        const yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y)

        ctx.save()
        ctx.beginPath()
        const gradientLine = ctx.createLinearGradient(0, top, 0, bottom)
        gradientLine.addColorStop(0, 'rgba(129, 129, 165, 1)')
        gradientLine.addColorStop(1, 'rgba(130, 130, 166, 0)')

        ctx.lineWidth = 3
        ctx.strokeStyle = gradientLine
        ctx.setLineDash([6, 6])
        ctx.moveTo(xCoor, yCoor)
        ctx.lineTo(xCoor, bottom)
        ctx.stroke()
        ctx.closePath()
      }
    },
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Flex align={'center'} gap={2} justify={'space-between'} style={{padding: '24px 0'}}>
        <TitleSection>Request History</TitleSection>

        {renderDatePickerComponent()}
      </Flex>
      <ContainerChartLine>
        <Flex align={'center'} gap={3} justify={'flex-end'}>
          {renderCustomCheckBox()}
        </Flex>
        <Line
          options={options as any}
          data={{
            labels: value ? filterDates(labelList, value[0], value[1]) : labelList,
            datasets: dataSetList,
          }}
          ref={chartRef}
          plugins={hoverLine as any}
        />
      </ContainerChartLine>
    </div>
  )
}

export const ChartComponentMemo = memo(ChartComponent)
