import Card from '../../UI/card';
import CardBody from '../../UI/cardBody';
import CardHeader from '../../UI/cardHeader';
import CardActions from '../../UI/cardActions';

const productSummary = (props) =>{
    return(
        <Card>
        <CardHeader>
            <img 
            classname="object-scale-down w-[50px]"
            src={props.product.image}
            alt= {props.product.name}
            />
        </CardHeader>
        
        <CardBody>
            <h3 className="font-bold">{props.product.name}</h3>
            <h5>Price: {props.product.price}</h5>
        </CardBody>
        <CardActions>
            <h5>Quantity: {props.product.quantity}</h5>
        </CardActions>
        </Card>


    )
}

export default productSummary;