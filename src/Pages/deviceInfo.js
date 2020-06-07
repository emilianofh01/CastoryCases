import React from 'react'
import '../Pages/styles/deviceInfo.css'
import $ from 'jquery'
import '../Components/styles/card.css'
import vue from '../vue'
import vue_the_mask from '../vue-the-mask'
const API = 'https://us-central1-castory-cases.cloudfunctions.net/getProduct/'


class deviceInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: 1,
            productInfo: {
                
            },
            
        }
    }

    async componentDidMount() {
        const ID = this.props.match.params.id
        await fetch(API + ID) 
        .then(response => response.json())
        .then(data => this.setState({productInfo: data, loading: false}))
        console.log(this.state.productInfo)
        setTimeout(()=> {
            const bg_navbar = document.querySelector(".bg-container");
            bg_navbar.style.top = "0%"

        },1000)
        $("#card").html(` <div class="wrapper" id="app"> <div class="card-form"> <div class="card-list"> <div class="card-item" v-bind:class="{'-active' : isCardFlipped}"> <div class="card-item__side -front"> <div class="card-item__focus" v-bind:class="{'-active' : focusElementStyle}" v-bind:style="focusElementStyle" ref="focusElement"></div><div class="card-item__cover"> <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'" class="card-item__bg"> </div><div class="card-item__wrapper"> <div class="card-item__top"> <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png" class="card-item__chip"> <div class="card-item__type"> <transition name="slide-fade-up"> <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'" v-if="getCardType" v-bind:key="getCardType" alt="" class="card-item__typeImg"> </transition> </div></div><label for="cardNumber" class="card-item__number" ref="cardNumber"> <template v-if="getCardType==='amex'"> <span v-for="(n, $index) in amexCardMask" :key="$index"> <transition name="slide-fade-up"> <div class="card-item__numberItem" v-if="$index > 4 && $index < 14 && cardNumber.length > $index && n.trim() !==''" >*</div><div class="card-item__numberItem" :class="{'-active' : n.trim()===''}" :key="$index" v-else-if="cardNumber.length > $index">{{cardNumber[$index]}}</div><div class="card-item__numberItem" :class="{'-active' : n.trim()===''}" v-else :key="$index + 1" >{{n}}</div></transition> </span> </template> <template v-else> <span v-for="(n, $index) in otherCardMask" :key="$index"> <transition name="slide-fade-up"> <div class="card-item__numberItem" v-if="$index > 4 && $index < 15 && cardNumber.length > $index && n.trim() !==''" >*</div><div class="card-item__numberItem" :class="{'-active' : n.trim()===''}" :key="$index" v-else-if="cardNumber.length > $index">{{cardNumber[$index]}}</div><div class="card-item__numberItem" :class="{'-active' : n.trim()===''}" v-else :key="$index + 1" >{{n}}</div></transition> </span> </template> </label> <div class="card-item__content"> <label for="cardName" class="card-item__info" ref="cardName"> <div class="card-item__holder">Card Holder</div><transition name="slide-fade-up"> <div class="card-item__name" v-if="cardName.length" key="1"> <transition-group name="slide-fade-right"> <span class="card-item__nameItem" v-for="(n, $index) in cardName.replace(/\s\s+/g, ' ')" v-if="$index===$index" v-bind:key="$index + 1">{{n}}</span> </transition-group> </div><div class="card-item__name" v-else key="2">Full Name</div></transition> </label> <div class="card-item__date" ref="cardDate"> <label for="cardMonth" class="card-item__dateTitle">Expires</label> <label for="cardMonth" class="card-item__dateItem"> <transition name="slide-fade-up"> <span v-if="cardMonth" v-bind:key="cardMonth">{{cardMonth}}</span> <span v-else key="2">MM</span> </transition> </label> / <label for="cardYear" class="card-item__dateItem"> <transition name="slide-fade-up"> <span v-if="cardYear" v-bind:key="cardYear">{{String(cardYear).slice(2,4)}}</span> <span v-else key="2">YY</span> </transition> </label> </div></div></div></div><div class="card-item__side -back"> <div class="card-item__cover"> <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + currentCardBackground + '.jpeg'" class="card-item__bg"> </div><div class="card-item__band"></div><div class="card-item__cvv"> <div class="card-item__cvvTitle">CVV</div><div class="card-item__cvvBand"> <span v-for="(n, $index) in cardCvv" :key="$index"> * </span> </div><div class="card-item__type"> <img v-bind:src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' + getCardType + '.png'" v-if="getCardType" class="card-item__typeImg"> </div></div></div></div></div><div class="card-form__inner"> <div class="card-input"> <label for="cardNumber" class="card-input__label">Card Number</label> <input type="text" id="cardNumber" class="card-input__input" v-mask="generateCardNumberMask" v-model="cardNumber" v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardNumber" autocomplete="off"> </div><div class="card-input"> <label for="cardName" class="card-input__label">Card Holders</label> <input type="text" id="cardName" class="card-input__input" v-model="cardName" v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardName" autocomplete="off"> </div><div class="card-form__row"> <div class="card-form__col"> <div class="card-form__group"> <label for="cardMonth" class="card-input__label">Expiration Date</label> <select class="card-input__input -select" id="cardMonth" v-model="cardMonth" v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardDate"> <option value="" disabled selected>Month</option> <option v-bind:value="n < 10 ? '0' + n : n" v-for="n in 12" v-bind:disabled="n < minCardMonth" v-bind:key="n">{{n < 10 ? '0' + n : n}}</option> </select> <select class="card-input__input -select" id="cardYear" v-model="cardYear" v-on:focus="focusInput" v-on:blur="blurInput" data-ref="cardDate"> <option value="" disabled selected>Year</option> <option v-bind:value="$index + minCardYear" v-for="(n, $index) in 12" v-bind:key="n">{{$index + minCardYear}}</option> </select> </div></div><div class="card-form__col -cvv"> <div class="card-input"> <label for="cardCvv" class="card-input__label">CVV</label> <input type="text" class="card-input__input" id="cardCvv" v-mask="'####'" maxlength="4" v-model="cardCvv" v-on:focus="flipCard(true)" v-on:blur="flipCard(false)" autocomplete="off"> </div></div></div><button class="card-form__button"> Submit </button> </div></div><a href="https://github.com/muhammederdem/credit-card-form" target="_blank" class="github-btn"> See on GitHub </a> </div>`)
        
        $("#vue")[0].innerHTML = (`<script>${vue}</script>`)
        $("#vueMask")[0].innerHTML = (`<script>${vue_the_mask}</script>`)
        
        $("#cardjs")[0].innerHTML = ("<script>new Vue({el: \"#app\",data() {return {currentCardBackground: Math.floor(Math.random()* 25 + 1), cardName: \"\",cardNumber: \"\",cardMonth: \"\",cardYear: \"\",cardCvv: \"\",minCardYear: new Date().getFullYear(),amexCardMask: \"#### ###### #####\",otherCardMask: \"#### #### #### ####\",cardNumberTemp: \"\",isCardFlipped: false,focusElementStyle: null,isInputFocused: false};},mounted() {this.cardNumberTemp = this.otherCardMask;document.getElementById(\"cardNumber\").focus();},computed: {getCardType () {let number = this.cardNumber;let re = new RegExp(\"^4\");if (number.match(re) != null) return \"visa\";re = new RegExp(\"^(34|37)\");if (number.match(re) != null) return \"amex\";re = new RegExp(\"^5[1-5]\");if (number.match(re) != null) return \"mastercard\";re = new RegExp(\"^6011\");if (number.match(re) != null) return \"discover\";re = new RegExp('^9792')if (number.match(re) != null) return 'troy'return \"visa\";},generateCardNumberMask () {return this.getCardType === \"amex\" ? this.amexCardMask : this.otherCardMask;},minCardMonth () {if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;return 1;}},watch: {cardYear () {if (this.cardMonth < this.minCardMonth) {this.cardMonth = \"\";}}},methods: {flipCard (status) {this.isCardFlipped = status;},focusInput (e) {this.isInputFocused = true;let targetRef = e.target.dataset.ref;let target = this.$refs[targetRef];this.focusElementStyle = {width: `${target.offsetWidth}px`,height: `${target.offsetHeight}px`,transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`}},blurInput() {let vm = this;setTimeout(() => {if (!vm.isInputFocused) {vm.focusElementStyle = null;}}, 300);vm.isInputFocused = false;}}});</script>")
    }
    render() {
        
        return(
            <div className="deviceInfo">
                <div id="vue"></div>
                <div id="vueMask"></div>
                <div id="cardjs"/>
                <div className="bg-container"></div>
                <div className="deviceInfo-container">
                    <div className="deviceImage-container">
                        <img className="deviceInfo_image" src={this.state.productInfo.productImages}/>
                        <div className="shareBar"></div>
                    </div>

                    <div className="deviceDescription-container">
                        <div className="deviceInfo-info-container">
        
                            <div className="description-titles-container">
                                <h1 className="productName">{this.state.productInfo.productName}</h1>
                                <h2 className="productBrand">{this.state.productInfo.productBrand}</h2>
                                <p className="productModeltext">{this.state.productInfo.productModel}</p>
                            </div>
                            <div className="price-container">
                                <p> ${this.state.productInfo.productPrice}.00 MXN</p>
                            </div>

                        </div>

                        <div className="deviceInfo_instructions-container">
                            <div className="pay-method-list">

                                <div id="card">

                                </div>

                            </div>
                        </div>
                        <div>
                            <h3 className="cantidad-title">Cantidad:</h3>
                            <div class="counter-container">
                                <a onClick={()=>this.setState({quantity:this.state.quantity - 1})} className="counter-suma">-</a>
                                <input value={this.state.quantity} className="counter-input" type="text" disabled/>
                                <a onClick={()=>this.setState({quantity:this.state.quantity + 1})} className="counter-resta">+</a>
                            </div>
                        </div>
                        <i className="icon-cart-plus-solid cart"></i>
                    </div>
                </div> 
            </div>
        )
    }
}

export default deviceInfo