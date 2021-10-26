from flask import Flask,jsonify,request,render_template,url_for,redirect
import util

app=Flask(__name__)

@app.route("/get_locations")
def homePage():
    response=jsonify({
        'locations':util.get_location()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route("/predict_price",methods=['POST'])
def predict_price():
    sqft=float(request.form['sqft'])
    loc = request.form['area']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])
    response = jsonify({
        'price': util.predict_price(loc, bhk, bath, sqft)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__=='__main__':
    app.run(debug=True)