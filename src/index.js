const express = require('express');
const path = require('path')
const morgan = require('morgan');
const exphbs  = require('express-handlebars');
var methodOverride = require('method-override')
const db=require('./config/db');
const { query } = require('express');
const app = express();
const port = process.env.PORT || 3000
const route = require('./routes')
var cors = require('cors')
var validator = require('validator')
require('dotenv').config()
// connect db
db.connect();

app.use(cors())
app.use('/src/resoures',express.static(path.join(__dirname,'resoures'))) // hiển thị ảnh

app.use(express.static(path.join(__dirname,'public')));
// cài middleware cho phương thức post để nạp dữ liệu vào body, pt get thì đc tích hợp sẵn nên dữ liệu dc lưu sẵn vào query
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
// để sử dụng method PUT
app.use(methodOverride('_method'))



app.use(morgan('combined'))
//templte engine
//định nghĩa các file  .handlebars có thể sữa lại hbs 
// app.engine('handlebars', exphbs({
//   extname:'handlebars'
// }));
// app.set('view engine', 'handlebars');
// dẫn path tới file view

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views',path.join(__dirname,'view'))

route(app); // khởi tạo route
//  request là những yêu cầu mà ng dùng gữi đi
//  response là sever trả về
// phương thức get là muốn nhận dữ liệu từ sever về cho client / khi submit thì dữ liệu hiện trên url có biến là name"""
// phương thức post là gữi dữ liệu từ client lên sever        / khi submit thì dữ liệu ẩn có biến là name"""

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
// run code = node + trang can runnod.