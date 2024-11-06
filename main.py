from flask import Flask, render_template, request, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
import os
from wtforms.validators import InputRequired

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'static/files'

class UploadFileForm(FlaskForm):
    file = FileField("Choose a file", validators=[InputRequired()])
    submit = SubmitField("Upload File")

@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
def home():
    form = UploadFileForm()
    if form.validate_on_submit():
        file = form.file.data  # Get the file
        filename = secure_filename(file.filename)  # Sanitize the filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))  # Save the file
        return redirect(url_for('uploaded_file', filename=filename))
    return render_template('index.html', form=form)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return f"File '{filename}' has been successfully uploaded."

if __name__ == '__main__':
    app.run(debug=True)
