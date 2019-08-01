import Odoo from 'odoo-xmlrpc'
import moment from 'moment'

var odoo = new Odoo({
    url: 'http://192.168.7.240',
    port: '8008',
    db: 'kit',
    username: 'admin',
    password: 'adminkit'
});

export const  odooRequest = (model, operation='search_read',fields =[], domain =[])=>{
    return new Promise ((resolve, reject)=> {
        odoo.connect((err) => {
            if(err) return reject('request error')
            let params = []
            if(operation === 'create'){
                let inParams = []
                params.push(inParams)
            }else {
                params = [[domain, fields]]
            }
            odoo.execute_kw(model, operation, params, (err, data)=>{
                if(err) return reject(`${operation} on ${model} error\n ${err}`)
                resolve(data)
            })
        })
    })
}

export const  odooPrintReport = (report_id, data)=>{
    return new Promise ((resolve, reject)=> {
        odoo.connect((err) => {
            if(err) return reject('request error')
            var inParams = [];
            inParams.push([
                ['attendance_date', '>=', moment(data.startDate).format('YYYY-MM-DD')],
                ['attendance_date', '<=', moment(data.endDate).format('YYYY-MM-DD')],
                ['batch_id.name', '=', data.batch],
                ['course_id.name', '=', data.course],
                ['semester_id.name', '=', data.semester],
                ['class_id.name', '=', data.group]
                ]);
            inParams.push(1)
            inParams.push(1)
            var params = [];
            params.push(inParams);
            odoo.execute_kw('op.attendance.sheet', 'search', params, function (err, value) {
                if (err) { return console.log(err) }
                if(value){
                    odoo.render_report(report_id, [[`${value[0]} ${data.startDate} ${data.endDate}`]], function (err2, value2) {
                        if (err2) { return reject('report error') }
                        return resolve(value2)
                    });
                }
            });
        })
    })

}
