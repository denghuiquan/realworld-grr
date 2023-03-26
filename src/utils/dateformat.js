import dayjs from 'dayjs'

/**
 *
 * @param {*} date 日期值
 * @param {*} DateFormat 日期格式字符串，如：'YYYY-MM-DD HH:mm:ss', 默认：'MMMM D, YYYY'
 * @returns
 */
export default function dateformat (date, DateFormat = 'MMMM D, YYYY') {
  return dayjs(date).format(DateFormat)
}
