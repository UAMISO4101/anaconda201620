import React, {Component} from 'react';


class NotificationForm extends Component{
    render(){
        return(
            <div className="sd notificationForm row">
                <div className="col-md-3"></div>
                <div className="col-md-6 sd borderForm" >
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-sm-12">
                                <input type="text" className="form-control" id="requestName" placeholder="Nombre de convocatoria "/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12">
                                <input type="text" className="form-control" id="description" placeholder="Description"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className=" col-sm-12">
                                <div className="checkbox">
                                    <label className="radio-inline"><input type="radio" name="optradio"/>Option 1</label>
                                    <label className="radio-inline"><input type="radio" name="optradio"/>Option 2</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="requestList" placeholder="Lista de Solicitudes"/>
                            </div>
                            <div className="col-sm-3">
                                <button type="button" className="btn btn-default btn-sm pull-right">
                                    <span className="glyphicon glyphicon-comment" aria-hidden="true"></span> Solicitud
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className=" col-sm-5">
                                <h4><span className="label label-default" />Fecha Inicio<span/></h4>
                                <input type="date" className="pull-left start-date "/>
                            </div>
                            <div className="col-sm-offset-2 col-sm-5">
                                <h4><span className="label label-default" />Fecha Cierre<span/></h4>
                                <input type="date" className="pull-right closing-date"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className=" col-sm-12">
                                <button type="submit" className="btn btn-default">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-md-3"></div>
            </div>
        )}
}

export default NotificationForm;
