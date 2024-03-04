import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es'

export default function (date: Date): String {
    TimeAgo.addDefaultLocale(es)
    const timeAgo = new TimeAgo('es-ES')

    return timeAgo.format(date)
}