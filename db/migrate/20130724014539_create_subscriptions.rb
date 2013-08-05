class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
<<<<<<< HEAD
      t.string :conekta_id
=======
>>>>>>> 0e98ad2b23d969d5fc0e659075fb655a013323bf
      t.integer :shipping_period
      t.integer :billing_period
      t.string :coffee_type
      t.string :referral_email
      t.string :promo_code
      t.string :payment_status
      t.string :utm_source
      t.string :utm_medium
      t.string :utm_term
      t.string :utm_content
      t.string :utm_campaign

      t.timestamps
    end
  end
end
