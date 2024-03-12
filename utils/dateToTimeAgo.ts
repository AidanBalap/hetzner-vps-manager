import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'

TimeAgo.addDefaultLocale(es)
const timeAgo = new TimeAgo('es-ES')

export default function (date: Date): String {
    return timeAgo.format(date)
}