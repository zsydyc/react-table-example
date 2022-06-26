import { FilterProps } from 'react-table'
import { ExperimentData } from '../../utils'

// This is a custom aggregator that
// takes in an array of values and
// returns the rounded median
export function roundedMedian(values: any[]) {
  let min = values[0] || ''
  let max = values[0] || ''

  values.forEach((value) => {
    min = Math.min(min, value)
    max = Math.max(max, value)
  })

  return Math.round((min + max) / 2)
}

// We assume the enum is 0 indexed, and is auto incremented
export function CheckboxColumnFilter({
  column: { render, filterValue, setFilter, id },
}: FilterProps<ExperimentData>) {
  // default render gives ReactElement, but is passed as an object
  const enumType = render('enumType') as Record<string, string>;

  return (
    <section>
      <label>
        {render('Header')}
      </label>

      {/* Todo: give styles to each filter group  */}
      <div>
        {Object.entries(enumType)
          .filter(([index, type]) => !isNaN(Number(index))) // we want all the number indexes
          .map(([index, type]) => {
            return (
              <span>
                <input type="checkbox"
                  key={`${enumType}_${type}`}
                  id={`${id}_${index}`}
                  name={type}
                  checked={filterValue?.[type]}
                  onChange={(e) => {
                    const val = e.target.checked
                    let newFilterValue = (filterValue ?? {})

                    if (!val) {
                      delete newFilterValue[type]
                      // Unset filter to undefined or it will try to match
                      if (Object.keys(newFilterValue).length === 0)
                        newFilterValue = undefined
                    } else newFilterValue[type] = val

                    setFilter(newFilterValue)
                  }}
                />
                <label htmlFor={`${enumType}_${type}`}>{type}</label>
              </span>
            );
          })
        }
      </div>

    </section>
  );
}


