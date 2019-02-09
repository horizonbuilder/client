import * as React from 'react';
import * as styles from './styles.css';
import { RouteComponentProps } from 'react-router-dom';
import { TabNavigation } from '../../../shared/components/TabNavigation';
import { FieldGroup } from '../../../shared/components/FieldGroup';
import { INLayout } from '../../../shared/layouts/InnerNavigationLayout';
// import { PropertyDocumentList } from '../../../shared/components/PropertyDocumentList';
//
export interface DocumentsRouteProps {
  workfileId: string;
}

export interface DocumentsState {
  // tracts: Array<ITract>;
  tractId: string;
}

export class Documents extends React.Component<
  RouteComponentProps<DocumentsRouteProps>,
  DocumentsState
> {
  unsubscribeFromTracts: any;
  mounted: boolean;

  constructor(props: RouteComponentProps<DocumentsRouteProps>) {
    super(props);

    this.state = {
      // tracts: [],
      tractId: '0'
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unsubscribeFromTracts && this.unsubscribeFromTracts();
  }

  // handleTractsUpdate = (tracts: Array<ITract>): void => {
  //   this.setState({
  //     tracts
  //   });
  // };

  render() {
    const { tractId } = this.state;
    // const groupOptions = tracts.map((tract, index) => ({
    //   label: `Tract ${index + 1}`,
    //   value: tract.id
    // }));

    // groupOptions.unshift({
    //   label: 'Workfile',
    //   value: 0
    // });

    return (
      <INLayout className={styles.Documents} header={'Documents'}>
        <INLayout.Navigation>
          <TabNavigation
            className={styles.SidebarNavigation}
            value={tractId}
            options={[]}
            onChange={e => {
              this.setState({ tractId: e.value });
            }}
          />
        </INLayout.Navigation>
        {/*<INLayout.Body>
          <FieldGroup id={'group_templates'} className={styles.SingleBlock} name="Files">
            <div className={styles.filesContainer}>
              <PropertyDocumentList
                parentId={this.props.match.params.workfileId}
                parentType={'workfile'}
                tractId={this.state.tractId}
              />
            </div>
          </FieldGroup>
        </INLayout.Body>*/}
      </INLayout>
    );
  }
}
