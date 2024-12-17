import { Alert, Button, Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import { FC, useState } from 'react';

export interface SlcfFormActionModelProps {
  icon: any;
  title: string;
  onCancel: any;
  actionBtnText: string;
  onFinish: any;
  subText: string;
  openModal: boolean;
  type: string;
  remarkRequired: boolean;
  translator: any;
}

export const SlcfFormActionModel: FC<SlcfFormActionModelProps> = (
  props: SlcfFormActionModelProps
) => {
  const {
    onFinish,
    onCancel,
    actionBtnText,
    subText,
    openModal,
    title,
    icon,
    type,
    remarkRequired,
    translator,
  } = props;
  const t = translator.t;
  const [popupError, setPopupError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Modal
      title={
        <div className="popup-header">
          <div className="icon">{icon}</div>
          <div>{title}</div>
        </div>
      }
      className={'popup-' + type}
      open={openModal}
      width={Math.min(430, window.innerWidth)}
      centered={true}
      footer={null}
      onCancel={onCancel}
      destroyOnClose={true}
    >
      <div className="transfer-form">
        <Form
          name="slcf_form_action_popup"
          layout="vertical"
          onChange={() => setPopupError(undefined)}
          onFinish={async (d) => {
            setLoading(true);
            if (d.comment) {
              d.comment = d.comment.trim();
            }
            const res = await onFinish(d.comment);
            setPopupError(res);
            setLoading(false);
          }}
        >
          {remarkRequired && (
            <Row>
              <Col span={24}>
                <Form.Item
                  className="remarks-label"
                  label="Remarks"
                  name="comment"
                  rules={[
                    {
                      required: remarkRequired,
                      message: 'Required field',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, v) {
                        if (remarkRequired && v !== undefined && v !== '' && v.trim() === '') {
                          // eslint-disable-next-line prefer-promise-reject-errors
                          return Promise.reject('Required!');
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input.TextArea placeholder="" />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row>
            <Col span={24}>
              <Form.Item className="text-left" valuePropName="checked" label="" name="confirm">
                <Checkbox className="label" onChange={(v) => setChecked(v.target.checked)}>
                  {t('view:confirmClosure')}
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          {popupError ? <Alert className="error" message={popupError} type="error" showIcon /> : ''}

          <Form.Item className="footer">
            <Button htmlType="button" onClick={onCancel}>
              {t('view:cancel')}
            </Button>
            <Button
              className="mg-left-2"
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!checked}
            >
              {actionBtnText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
