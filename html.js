
var kittyGiraudelHtml = `

<style>
@import url(https://fonts.googleapis.com/css?family=Orbitron);
* {
  box-sizing: border-box;
}

.wrapper {
  width: 350px;
  height: 500px;
  margin: 60px auto;
  position: relative;
}

.wrapper ul:after {
  content: "";
  display: table;
  clear: both;
}

.wrapper li {
  float: left;
  width: 50px;
  height: 50px;
  border: 15px solid;
}

.wrapper li.f1 {
  background: #172b36;
}

.wrapper li.f2 {
  background: #e4ddbe;
}

.wrapper li.t1 {
  border-color: #58a27e;
}

.wrapper li.t2 {
  border-color: #008e84;
}

.wrapper li.t3 {
  border-color: #438998;
}

.wrapper li.t4 {
  border-color: #057a72;
}

.wrapper li.t5 {
  border-color: #cc6633;
}

.wrapper li.t6 {
  border-color: #d3a14b;
}

.wrapper li.empty {
  background: none;
  border: none;
}

.wrapper h1 {
  color: #dbdabc;
  font-family: 'Orbitron', sans-serif;
  text-transform: uppercase;
  font-size: 70px;
  transform: scaleX(0.84);
  position: relative;
  left: -30px;
}

.wrapper .moon {
  width: 90px;
  height: 90px;
  background: #dbdabc;
  border-radius: 50%;
  position: absolute;
  right: 80px;
  top: -100px;
}

.wrapper .moon:after,
.wrapper .moon:before,
.wrapper:after {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid #8bb6b3;
  border-left: none;
  border-top: none;
  position: absolute;
  opacity: 0.75;
  -webkit-filter: blur(1px);
}

.wrapper .moon:after {
  right: 8px;
  top: 30%;
  transform: rotate(-10deg);
}

.wrapper .moon:before {
  transform: scale(0.5) rotate(-10deg);
  bottom: 10px;
  left: 45%;
}

.wrapper:after {
  transform: scale(0.65) rotate(-10deg);
  top: -60px;
  right: 130px;
}

</style>
<div class="wrapper">
  <div class="moon"></div>
  <ul>
  <li class="empty"></li>
  <li class="f1 t1"></li>
  <li class="empty"></li>
  <li class="empty"></li>
  <li class="empty"></li>
  <li class="empty"></li>
  <li class="f2 t2"></li>

  <li class="f1 t1"></li>
  <li class="f2 t1"></li>
  <li class="empty"></li>
  <li class="f1 t3"></li>
  <li class="empty"></li>
  <li class="empty"></li>
  <li class="f1 t2"></li>

  <li class="f2 t1"></li>
  <li class="f1 t4"></li>
  <li class="empty"></li>
  <li class="f2 t3"></li>
  <li class="empty"></li>
  <li class="f2 t6"></li>
  <li class="f2 t2"></li>

  <li class="f1 t3"></li>
  <li class="f2 t4"></li>
  <li class="f1 t5"></li>
  <li class="f2 t5"></li>
  <li class="empty"></li>
  <li class="f1 t6"></li>
  <li class="f2 t2"></li>

  <li class="f1 t3"></li>
  <li class="f2 t4"></li>
  <li class="f2 t4"></li>
  <li class="f1 t5"></li>
  <li class="f2 t5"></li>
  <li class="f1 t6"></li>
  <li class="f1 t6"></li>
</ul>
</div>

`
